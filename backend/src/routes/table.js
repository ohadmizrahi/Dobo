const { Router } = require('express');
const { authenticateUserToken } = require("@src/middlewares/authenticateUserToken.js");
const { validateAccountWithoutOpenTables, validateClientToken } = require("@src/middlewares/tableValidations.js");
const { openOrJoinVirtualTable, getVirtualTableInfo } = require("@src/api/table/virtualTable.js");
const { payCheck, recalculateCheck, handleCalculateCheck } = require("@src/api/table/checkout.js");
const { generateClientToken } = require("@src/api/auth/token.js");
const { getMenu } = require("@src/api/menu/item.js");

const router = Router();

router.use(authenticateUserToken);

router.get("/api/table", validateClientToken, async (req, res) => {
    const client = req.client;

    try { 
        
        const { success, virtualTable, orders, clients } = await getVirtualTableInfo(client.virtualtable);
        if (success) {
            res.status(200).json({ success, virtualTable, orders, clients });
        } else {
            res.status(404).json({ error: 'Virtual table not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during searching table.' });
    }
});

router.post("/api/table/join", validateAccountWithoutOpenTables, async (req, res) => {
    const username = req.user.username;
    const { businessId, tableId } = req.body;
    try {
        const { success, client, virtualTable, operation, message } = await openOrJoinVirtualTable(username, businessId, tableId);
        if (success) {
            const clientTokens = generateClientToken(client.clientid);
            const clientInfo = { ...client, ...clientTokens };
            const menu = await getMenu(businessId);
            res.status(200).json({ 
                success: true,
                message: 'Joined table successfully',
                operation: operation,
                virtualTable: virtualTable,
                client: clientInfo,
                menu
            });
        } else {
            res.status(400).json({ success: false, message: message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during open or join table.' });
    }
});

router.get("/api/table/auth/refresh", validateClientToken, async (req, res) => {
    const { clientid } = req.client;
    try {
        const { token, tokenForRefresh } = generateClientToken(clientid)
        if (token && tokenForRefresh) {
            res.status(200).json({ success: true, token, tokenForRefresh, message: 'Token refresh successful' });
        } else {
            res.status(401).json({ success: false, message: 'Token refresh failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during token refresh.' });
    }
});

router.get("/api/table/check/calculate", validateClientToken, async (req, res) => {
    await handleCalculateCheck(req, res);
});

router.post("/api/table/check/recalculate", validateClientToken, async (req, res) => {
    const { clientid } = req.client;
    const { orders } = req.body;
    try {
        const response = await recalculateCheck(clientid, orders);
        if (response.success) {
            await handleCalculateCheck(req, res);
        } else {
            res.status(400).json({
                success: response.success,
                message: response.message,
                failedOrders: response.failedOrders
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during updating client check.' });
    }
});

router.post("/api/table/check/pay", validateClientToken, async (req, res) => {
    const { clientid } = req.client;
    const { orders } = req.body;
    try {
        const response = await payCheck(clientid, orders);
        if (response.success) {
            console.log({ clientDisabled: response.clientDisabled, message: response.message });
            await handleCalculateCheck(req, res);
        } else {
            res.status(400).json({ success: response.success, message: response.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during paying client check.' });
    }
});

module.exports = router;

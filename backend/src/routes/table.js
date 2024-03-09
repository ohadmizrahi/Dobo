const { Router } = require('express');
const { authenticateUserToken } = require("@src/middlewares/authenticateUserToken.js");
const { validateAccountWithoutOpenTables, validateClientToken } = require("@src/middlewares/tableValidations.js");
const { openOrJoinVirtualTable, getClientBalance, getVirtualTableInfo } = require("@src/api/table/virtualTable.js");
const { generateClientToken } = require("@src/api/token.js");
const { getMenu } = require("@src/api/menu/items.js");

const router = Router();

router.use(authenticateUserToken);

router.get("/api/table", validateClientToken, async (req, res) => {
    const client = req.client;

    try { 
        const { success, virtualTable, orders, clients } = await getVirtualTableInfo(client.virtualTable);
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
            const clientTokens = generateClientToken(client.clientId);
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
    const { clientId } = req.client;
    try {
        const { token, tokenForRefresh } = generateClientToken(clientId)
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

router.get("/api/table/checkout", validateClientToken, async (req, res) => {
    const client = req.client;

    try { 
        const { success, balance, message } = await getClientBalance(client.clientId);
        if (success) {
            res.status(200).json({ success, balance });
        } else {
            res.status(404).json({ error: message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during retriving client balance.' });
    }
});

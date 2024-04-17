const { Router } = require('express');
const { authenticateUserToken, authenticateClientToken } = require("@src/middlewares/authenticateToken.js");
const { validateAccountWithoutOpenTables } = require("@src/middlewares/tableValidations.js");
const { openOrJoinVirtualTable, getVirtualTableInfo, closeVirtualTable } = require("@src/api/table/virtualTable.js");
const { payCheck, recalculateCheck, handleCalculateCheck } = require("@src/api/table/checkout.js");
const { generateClientToken } = require("@src/api/auth/token.js");
const { getMenu } = require("@src/api/menu/item.js");
const { handleNewOrders, produce } = require("@src/api/table/order.js");
const connectToRabbitMQ = require("@be/connections/rabbitmq.js");

const router = Router();


router.use(authenticateUserToken);

router.get("/api/table", authenticateClientToken, async (req, res) => {
    const client = req.client;

    try { 
        
        const { success, virtualTable, orders, clients } = await getVirtualTableInfo(client.virtualtable);
        if (success) {
            res.status(200).json({ success, virtualTable, orders, clients });
        } else {
            res.status(404).json({ message: 'Virtual table not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during searching table.' });
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
        res.status(500).json({ message: 'An error occurred during open or join table.' });
    }
});

router.get("/api/table/auth/refresh", authenticateClientToken, async (req, res) => {
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
        res.status(500).json({ message: 'An error occurred during token refresh.' });
    }
});

router.post("/api/table/order", authenticateClientToken, async (req, res) => {
    const { virtualtable } = req.client;
    const { orders } = req.body;
    try {
        channel = await connectToRabbitMQ()
        const handle = await handleNewOrders(virtualtable, orders);
        if (handle.success) {
            const produced = await produce(channel, virtualtable, orders);
            if (!produced.success) {
                res.status(500).json({ success: false, message: produced.message });
            }
            res.status(200).json({ success: true, message: "Order added to table queue", virtualTable: handle.virtualTable });
    
        } else {
            
            res.status(400).json({ success: false, message: handle.message });
    
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during producing the order.' });
    }
});

router.get("/api/table/check/calculate", authenticateClientToken, async (req, res) => {
    await handleCalculateCheck(req, res);
});

router.post("/api/table/check/recalculate", authenticateClientToken, async (req, res) => {
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
        res.status(500).json({ message: 'An error occurred during updating client check.' });
    }
});

router.post("/api/table/check/pay", authenticateClientToken, async (req, res) => {
    const { clientid } = req.client;
    const { orders } = req.body;
    try {
        const response = await payCheck(clientid, orders);
        if (response.success) {
            console.log(response);
            await handleCalculateCheck(req, res);
        } else {
            if (response.message === 'No orders to pay') {
                res.status(404).json({ success: response.success, ordersCount: response.ordersCount, message: response.message });
            }
            res.status(400).json({ success: response.success, message: response.message, failedOrders: response.failedOrders});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during paying client check.' });
    }
});

router.post("/api/table/close", async (req, res) => {
    const { virtualTableId } = req.body;
    try {
        const response = await closeVirtualTable(virtualTableId);
        if (response.success) {
            res.status(200).json({ success: true, message: "Virtual Table Closed", virtualTable: response.virtualTable });
        } else {
            if (response.message === 'Virtual Table not found' || response.message === 'Consumer Agent not found') {
                res.status(404).json({ success: false, message: response.message });
            } else {
                res.status(400).json({ success: false, message: response.message });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during closing virtual table.' });
    }
});




module.exports = router;

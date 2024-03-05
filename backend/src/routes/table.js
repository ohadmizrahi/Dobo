const { Router } = require('express');
const { authenticateUserToken } = require("@src/middlewares/authenticateUserToken.js");
const { validateAccountWithoutOpenTables, validateClientToken } = require("@src/middlewares/tableValidations.js");
const { verifyClientActive } = require("@src/middlewares/clientValidations.js");
const { openOrJoinVirtualTable } = require("@src/api/table/virtualTable.js");
const { generateClientToken } = require("@src/api/token.js");
const { find: getVirtualTable } = require("@src/models/virtualTables.js");
const { findClientsByVirtualTable: getClients } = require("@src/models/clients.js");
const { findOrdersByVirtualTable: getOrders } = require("@src/models/orders.js");
const { findByBusiness: getMenu } = require("@src/models/items.js");

const router = Router();

router.use(authenticateUserToken);

router.get("/api/table", validateClientToken, verifyClientActive, async (req, res) => {
    const clientId = req.virtualTable.clientId;
    const virtualTableId = req.virtualTable.virtualTableId;
    try {
        const virtualTable = await getVirtualTable(virtualTableId);
        if (virtualTable && virtualTable.active) {
            const orders = await getOrders(virtualTableId);
            const clients = await getClients(virtualTableId);
            res.status(200).json({ success: true, virtualTable, orders, clients });
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
        const response = await openOrJoinVirtualTable(username, businessId, tableId);
        if (response.success) {
            const clientTokens = generateClientToken(response.client.accountId, response.virtualTable.virtualTableId);
            const client = { ...response.client, ...clientTokens };
            const menu = await getMenu(businessId);
            res.status(200).json({ 
                success: true,
                message: 'Joined table successfully',
                operation: response.operation,
                virtualTable: response.virtualTable,
                client,
                menu
            });
        } else {
            res.status(400).json({ success: false, message: response.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during open or join table.' });
    }
});


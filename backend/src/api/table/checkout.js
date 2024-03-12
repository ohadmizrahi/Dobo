const { findOne, getTableClients, disable } = require('@src/models/client.js');
const { getItemPrice } = require("@src/models/orders.js");
const { getClientOrders, updateOrderClients, updateClientOrder } = require("@src/models/clientOrders.js");

async function calculateCheck(clientId) {
    try {
        const orders = await getClientOrders(clientId);
        const clientBalance = orders.reduce((total, order) => total + order.clientCost, 0);
        return { success: true, clientBalance, clientOrders: orders, message: 'Client check retrieved successfully' };
    } catch (error) {
        throw new Error('Get Client Check failed');
    }
}

async function handleCalculateCheck(req, res) {
    const client = req.client;

    try { 
        const { success, clientBalance, clientOrders, message } = await calculateCheck(client.clientId);
        if (success) {
            if (clientBalance < 0) {
                res.status(400).json({ success: false, clientBalance, message: 'Insufficient balance' });
            } else if (clientOrders.length === 0) {
                res.status(404).json({ success: false, ordersCount: clientOrders.length, message: 'No orders' });
            } else {
                res.status(200).json({ success, clientBalance, clientOrders });
            }
        } else {
            res.status(404).json({ error: message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during retrieving client check.' });
    }
}

async function recalculateCheck(clientId, orders) {
    let failedOrders = [];
    try {
        const clientOrdersIds = orders.map(order => {
            return order.orderId;
        });

        const itemPrice = await getItemPrice(orderId);
        const client = await findOne(clientId)
        const clientTable = client[0].virtualTable;
        const tableClients = await getTableClients(clientTable, true);

        for (const order in clientOrdersIds) {
            const { success, message } = await updateOrderClients(order, clientId, tableClients, itemPrice);
            if (!success) {
                console.error(message);
                failedOrders.push(order);
            }
        }
        
        if (failedOrders.length === 0) {
            return { success: true, message: 'Client check updated successfully' };
        } else {
            return { success: false, message: 'Some of the client orders cant be updatetd', failedOrders };
        }
    } catch (error) {
        throw new Error('Update Client Check failed');
    }
}

async function payCheck(clientId, ordersToPay) {
    try {
        if (ordersToPay.length === 0) {
            return { success: false, message: "No orders to pay" };
        }
        const failedOrders = [];
        for (const order in ordersToPay) {
            const { success, message } = await updateClientOrder(order, clientId);
            if (!success) {
                console.error(message);
                failedOrders.push(order);
            }
        }
        if (failedOrders.length === 0) {
            const client = disable(clientId);
            if (client.success) {
                return { success: true, message: 'Client check paid successfully' };
            } else {
                return { success: false, message: 'Client check paid but client failed to disable' };
            }
        } else {
            return { success: false, message: 'Some of the client orders cant be paid', failedOrders };
        }
    } catch (error) {
        throw new Error('Pay Client Check failed');
    }
}

module.exports = {
    handleCalculateCheck,
    recalculateCheck,
    payCheck
}
const { findOne, getTableClients, disable } = require('@src/models/client.js');
const { getItemPrice } = require("@src/models/order.js");
const { getClientOrders, updateOrderClients, updateClientOrder } = require("@src/models/clientOrders.js");
const { closeVirtualTable } = require("@src/api/table/virtualTable.js");

async function calculateCheck(clientId) {
    try {
        const orders = await getClientOrders(clientId);
        const clientBalance = orders.reduce((total, order) => total + parseFloat(order.clientcost), 0);
        return { success: true, clientBalance, clientOrders: orders, message: 'Client check retrieved successfully' };
    } catch (error) {
        console.error(error);
        throw new Error(`Get Client Check failed\n${error}`);
    }
}

async function handleCalculateCheck(req, res) {
    const client = req.client;

    try { 
        const { success, clientBalance, clientOrders, message } = await calculateCheck(client.clientid);
        if (success) {
            if (clientBalance < 0) {
                res.status(400).json({ success: false, clientBalance, message: 'Insufficient balance' });
            } else if (clientOrders.length === 0) {
                res.status(404).json({ success: false, ordersCount: clientOrders.length, message: 'No orders' });
            } else {
                res.status(200).json({ success, clientBalance, clientOrders });
            }
        } else {
            res.status(404).json({ message: message });
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
        
        const client = await findOne(clientId)
        const clientTable = client[0].virtualtable;
        const activeTableClients = await getTableClients(clientTable, true);
        const activeTableClientsIds = activeTableClients.map(client => client.clientid);

        for (const orderId of clientOrdersIds) {
            const itemPrice = await getItemPrice(orderId);
            if (!itemPrice) {
                console.error(`Item price for order ${orderId} not found`);
                failedOrders.push(orderId);
                continue;
            }
            const { success, message } = await updateOrderClients(orderId, clientId, activeTableClientsIds, itemPrice);
            if (!success) {
                console.error(message);
                failedOrders.push(orderId);
            }
        }
        
        if (failedOrders.length === 0) {
            return { success: true, message: 'Client check updated successfully' };
        } else {
            return { success: false, message: 'Some of the client orders cant be updatetd', failedOrders };
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Recalculate check failed\n${error}`);
    }
}

async function payCheck(clientId, ordersToPay) {
    try {
        if (ordersToPay.length === 0) {
            return { success: false, message: "No orders to pay" };
        }
        const failedOrders = [];
        for (const order of ordersToPay) {
            const { success, message } = await updateClientOrder(clientId, order.orderId, true);
            if (!success) {
                console.error({ error: message });
                failedOrders.push(order);
            }
        }
        const orders = await getClientOrders(clientId);
        if (failedOrders.length === 0) {
            if (orders.length !== 0) {
                return { success: true, clientDisabled: false, message: 'Client paid on part of the check' };
            }
            const client = await disable(clientId);
            if (client.success) {
                const activeTableClients = await getTableClients(clientTable, true);
                if (activeTableClients.length === 0) {
                    const virtualTable = await closeVirtualTable(client.virtualtable);
                    if (virtualTable.success) {
                        return { success: true, clientDisabled: true, tableClosed: true, message: 'Client check paid successfully and table closed' };
                    } else {
                        return { success: true, clientDisabled: true, tableClosed: false,  message: 'Client check paid successfully but table closing failed' };
                    }
                }

                return { success: true, clientDisabled: true, tableClosed: false, message: 'Client check paid successfully' };
            } else {
                return { success: true, clientDisabled: false, tableClosed: false, message: 'Client check paid but disabling client failed' };
            }
        } else {
            return { success: false, message: 'Some of the client orders cant be paid', failedOrders };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Pay Client Check failed');
    }
}

module.exports = {
    handleCalculateCheck,
    recalculateCheck,
    payCheck
}
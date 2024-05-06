const { create: createOrder, deleteOrder } = require("@src/models/order.js")
const { splitOrder } = require("@src/models/clientOrders.js")
const { getTableClients } = require("@src/models/client.js")
const { find: findVirtualTable } = require("@src/models/virtualTables.js")

async function handleNewOrders(virtualTable, orders) {
    const promises = orders.map(async order => {
        try {
            const { itemId, clients, price } = order
            const creation = await createOrder({ itemId, virtualTable })
            if (!creation.success) {
                return { success: false, step: 'create', message: creation.message }
            }
            
            let activeClients = await getTableClients(virtualTable, active=true)
            activeClients = activeClients.map(client => client.clientid)
            const clientsForSpliting = clients.filter(clientId => activeClients.includes(clientId))
            
            const splitted = await splitOrder(creation.order, clientsForSpliting, price)
            if (!splitted.success) {
                await deleteOrder(creation.order)
                return { success: false, step: 'split', message: splitted.message }
            }
            return { success: true, virtualTable }

        } catch (error) {
            let step = 'create'
            if (creation && creation.success) {
                step = 'split'
                await deleteOrder(creation.order)
            }
            console.error(error);
            return { success: false, step: step, message: error }
        }
    });

    return Promise.all(promises)
        .then(results => {
            const unsuccessful = results.filter(result => !result.success);
            if (unsuccessful.length > 0) {
                return {
                    success: false,
                    numOfUnsuccessfulOrders: unsuccessful.length,
                    unsuccessfulOrders: unsuccessful,
                    step: unsuccessful[0].step,
                    message: unsuccessful[0].message
                };
            }

            return { success: true, virtualTable };
        })
        .catch(error =>  ({ success: false, message: error }));
}

async function produce(channel, virtualTable, orders) {
    try {
        const virtualTables = await findVirtualTable(virtualTable, active=true)
        const { tableid, businessid } = virtualTables[0]
    
        const orderToSend = groupOrdersByItem(orders)
        const payload = {
            tableid,
            businessid,
            orders: orderToSend
        }
        
        if (!channel) {
            console.warn('Failed to connect to RabbitMQ server.');
            return { success: false, message: 'Failed to connect to RabbitMQ server.' }
        }

        const queue = virtualTable;
        const msg = JSON.stringify(payload);

        channel.assertQueue(
            queue, { durable: false }
        );

        channel.sendToQueue(queue, Buffer.from(msg));

        return { success: true, message: "Order added to table queue", virtualTable };

    } catch (error) {
        console.error(error);
        return { success: false, message: error }
    }
}

function groupOrdersByItem(orders) {
    const ordersMap = orders.reduce((acc, item) => {
        if (!acc[item.itemId]) {
            acc[item.itemId] = {
                itemId: item.itemId,
                itemName: item.itemName,
                count: 1
            };
        } else {
            acc[item.itemId].count++;
        }
        return acc;
    }, {});

    return Object.values(ordersMap);
}

module.exports = {
    handleNewOrders,
    produce
}
const connectToRabbitMQ = require('@be/connections/rabbitmq.js');
const { create: createOrder, deleteOrder } = require("@src/models/order.js")
const { splitOrder } = require("@src/models/clientOrders.js")
const { find: findVirtualTable } = require("@src/models/virtualTables.js")

async function handleNewOrders(virtualTable, orders) {
    const promises = orders.map(async order => {
        try {
            const { itemId, clients, price } = order
            const creation = await createOrder({ itemId, virtualTable })
            if (!creation.success) {
                return { success: false, step: 'create', message: creation.message }
            }
            const splitted = await splitOrder(creation.order, clients, price)
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

async function produce(virtualTable, orders) {
    try {
        console.log('find virtual table')
        const virtualTables = await findVirtualTable(virtualTable, active=true)
        const { tableid, businessid } = virtualTables[0]
    
        const orderToSend = groupOrdersByItem(orders)
        const payload = {
            tableid,
            businessid,
            orders: orderToSend
        }
        channel = await connectToRabbitMQ()
        // TODO: Until RabbitMQ is implemented, resolve with null
        if (!channel) {
            console.warn('Failed to connect to RabbitMQ server.');
            return
        }

        const queue = virtualTable;
        const msg = JSON.stringify(payload);

        channel.assertQueue(
            queue, { durable: false }
        );

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log('message sent');
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
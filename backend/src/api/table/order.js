const { create: createOrder } = require("@src/models/order.js")
const { splitOrder } = require("@src/models/clientOrders.js")
const { find: findVirtualTable } = require("@src/models/virtualTable.js")

async function handleNewOrders(virtualTable, orders) {
    orders.forEach(order => async () => {
        try {
            const { itemId, clients, price } = order
            const ceration = await createOrder({ itemId, virtualTable })
            if (!ceration.success) {
                return { success: false, message: creating.message }
            }

            const splitted = splitOrder(ceration.order, clients, price)
            if (!splitted.success) {
                return { success: false, message: splitted.message }
            }

        } catch (error) {
            return { success: false, message: error }
        }
    });
}

async function sendToProducer(virtualTable, orders) {
    const { tableId, businessId } = findVirtualTable(virtualTable, active=true)
    const orderToSend = groupOrdersByItem(orders)
    const payload = {
        tableId,
        businessId,
        orders: orderToSend
    }
    fetch(`http://localhost:8001/producer/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    ).then(response => print(`RESPONSE: ${response.json()}`)).catch(error => console.error('Error:', error))


}

function groupOrdersByItem(orders) {
    const ordersMap = orders.reduce((acc, item) => {
        if (!acc[item.itemId]) {
            // If the item is not in the accumulator, add it with a count of 1
            acc[item.itemId] = {
                itemId: item.itemId,
                itemName: item.itemName,
                count: 1
            };
        } else {
            // If the item is already in the accumulator, increment its count
            acc[item.itemId].count++;
        }
        return acc;
    }, {});

    // Convert the item map to an array of items
    return Object.values(ordersMap);
}



module.exports = {
    handleNewOrders,
    sendToProducer
}
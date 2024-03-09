const { create: createOrder } = require("@src/models/order.js")

async function newOrders(orders) {
    orders.forEach(order => async () => {
        try {
            const creating = await createOrder(order)
            if (!creating.success) {
                return { success: false, message: creating.message }
            }
        } catch (error) {
            return { success: false, message: error }
        }
        
        const orderToSend = createBon({...creating.order, ...order})
        const queued = await addOrderToQueue(orderToSend)
        if (!queued.success) {
            return { success: false, message: queued.message }
        }
        const { payers, price } = orderToSend
        const pricePerPayer = price / payers.length
        // const updated = await updateClients(payers, "total", pricePerPayer)
        if (!updated.success) {
            return { success: false, message: updated.message }
        }
    });
}
function createBon(order) {
    const { itemId, virtualTable, payers, status } = order
    const bon = {
        itemId,
        virtualTable,
        payers,
        status
    }
    return bon
}

async function sendQueuedOrders(business) {
    const con = await connectBusiness(business)
    const orders = await getQueuedOrders()
    const failed = []
    orders.forEach(order => {
        const response = con.sendOrder(order)
        if (!response.success) {
            failed.push(order.orderId)
        }
    });
    if (failed.length > 0) {
        return { success: false, message: "Failed to send orders", failedOrders: failed }
    }
    return { success: true, message: "Orders sent", orders: orders.map(order => order.orderId) }
}

async function connectBusiness(businessId) {
    return businessId
}

module.exports = {
    newOrders,
    sendQueuedOrders
}
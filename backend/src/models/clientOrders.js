const { pool } = require('@be/database/pool.js');


async function getClientOrders(clientId) {
    const query = `
    SELECT 
        co.orderId as orderId,
        i.name as itemName,
        i.price as totalPrice,
        co.cost as clientCost 
    FROM 
        clientOrders co 
            JOIN orders o ON co.orderId = o.orderId 
                JOIN items i ON o.itemId = i.itemId 
    WHERE 
        co.clientId = $1 AND co.paid = $2;`;

    const values = [clientId, false];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function getOrderClients(orderId) {
    const query = `
    SELECT c.clientId as clientId, a.fullName as clientName
    FROM 
        clientOrders co 
            JOIN clients c ON co.clientId = c.clientId
				JOIN accounts a on a.accountId = c.accountId
    WHERE co.orderId = $1;`;

    const values = [orderId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}
async function updateOrderClients(orderId, clientId, tableClients, itemPrice) {
    try {
        const orderClients = await getOrderClients(orderId);
        const orderClientsIds = orderClients.reduce((ids, client) => ids.push(client.clientId), []);

        if (!orderClientsIds.includes(clientId)) {
            return { success: false, message: "Client not in order" };
        } else {
            let clientsForSpliting = [...tableClients]

            if (clientsForSpliting.length === 1 && clientsForSpliting[0].clientId === clientId) {
                return { success: false, message: "Client is the last client in table" };
            }
            
            if (orderClientsIds.length > 1) {
                clientsForSpliting = clientsForSpliting.filter(client => client.clientId !== clientId);
            } 
            const { success, modifiedClientsCount, message } = await splitOrder(orderId, clientsForSpliting, itemPrice);
            if (!success) {
                return { success: false, message: message};
            }
            return { success: true, message: "Order split", modifiedClientsCount };
    }
    } catch (error) {
        throw new Error(`Update client Check Failed:\n${error}`);
    }
}

async function splitOrder(orderId, tableClients, itemPrice) {
    try {
        const newCost = itemPrice / tableClients.length;

        const client = await pool.connect();
        await client.query('BEGIN');
        const query = `
        INSERT INTO clientOrders (clientId, orderId, cost)
        VALUES ($1, $2, $3)
        ON CONFLICT (clientId, orderId)
        DO UPDATE SET cost = EXCLUDED.cost;`;

        let modifiedClientsCount = 0;
        for (const clientId of tableClients) {
            const values = [clientId, orderId, newCost];
            const result = await client.query(query, values);
            modifiedClientsCount += result.rowCount;
        }
        if (modifiedClientsCount !== tableClients.length) {
            await client.query('ROLLBACK');
            return { success: false, message: "Order split failed" };
        }
        await client.query('COMMIT');
        return { success: true, message: "Order split", modifiedClientsCount };
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error(`Split Order Failed:\n${error}`);
    }
}

async function updateClientOrder(clientId, orderId, paid) {
    const query = `
    UPDATE clientOrders
    SET paid = $1
    WHERE clientId = $2 AND orderId = $3;`;

    const values = [paid, clientId, orderId];
    try {
        const res = await pool.query(query, values);
        if (res.rowCount === 1) {
            return { success: true, message: "Client Order Paid" }
        } else {
            return { success: false, message: "Client Order not found" }
        }
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}


module.exports = {
    getClientOrders,
    getOrderClients,
    updateOrderClients,
    updateClientOrder
}
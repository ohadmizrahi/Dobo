const pool = require('@be/database/pool.js');


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
        const orderClientsIds = orderClients.reduce((ids, client) => {
            ids.push(client.clientid);
            return ids;
        }, []);

        if (!orderClientsIds.includes(clientId)) {
            return { success: false, message: "Client not in order" };
        } else {
            let clientsForSpliting = [...tableClients]

            if (clientsForSpliting.length === 1 && clientsForSpliting[0].clientid === clientId) {
                return { success: false, message: "Client is the last client in table" };
            }
            if (orderClientsIds.length > 1) {
                clientsForSpliting = clientsForSpliting.filter(client => client.clientid !== clientId);
                const isDeleted = await deleteClientOrder(clientId, orderId);
                if (!isDeleted.success) {
                    return { success: false, message: isDeleted.message };
                }
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

        const dbClient = await pool.connect();
        await dbClient.query('BEGIN');
        const query = `
        INSERT INTO clientOrders (clientId, orderId, cost)
        VALUES ($1, $2, $3)
        ON CONFLICT (clientId, orderId)
        DO UPDATE SET cost = EXCLUDED.cost;`;

        let modifiedClientsCount = 0;
        for (const client of tableClients) {
            const values = [client.clientid, orderId, newCost];
            const result = await dbClient.query(query, values);
            modifiedClientsCount += result.rowCount;
        }
        if (modifiedClientsCount !== tableClients.length) {
            await dbClient.query('ROLLBACK');
            return { success: false, message: "Order split failed" };
        }
        await dbClient.query('COMMIT');
        return { success: true, message: "Order split", modifiedClientsCount };
    } catch (error) {
        await dbClient.query('ROLLBACK');
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

async function deleteClientOrder(clientId, orderId) {
    const query = `
    DELETE FROM clientOrders
    WHERE clientId = $1 AND orderId = $2;`;

    const values = [clientId, orderId];
    try {
        const res = await pool.query(query, values);
        if (res.rowCount === 1) {
            return { success: true, message: "Client Order Deleted" }
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
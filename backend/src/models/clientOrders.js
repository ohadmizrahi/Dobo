const pool = require('@be/connections/postgres.js');


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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
        throw new Error(`Update client Check Failed:\n${error}`);
    }
}

async function splitOrder(orderId, clients, itemPrice) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const newCost = itemPrice / clients.length;

        const values = [];
        const valueTuples = [];
        let i = 1;

        for (const clientId of clients) {
            values.push(clientId, orderId, newCost);
            valueTuples.push(`($${i++}, $${i++}, $${i++})`);
        }

        const query = `
        INSERT INTO clientOrders (clientId, orderId, cost)
        VALUES ${valueTuples.join(', ')}
        ON CONFLICT (clientId, orderId)
        DO UPDATE SET cost = EXCLUDED.cost;`;

        const result = await client.query(query, values);

        if (result.rowCount !== clients.length) {
            throw new Error(`Order split failed: expect to insert ${clients.length} but insert ${result.rowCount}.`);
        }

        await client.query('COMMIT');

        return { success: true, message: "Order split", modifiedClientsCount: result.rowCount };
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        throw new Error(`Split Order Failed:\n${error}`);
    } finally {
        client.release();
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
        console.error(error);
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
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

module.exports = {
    getClientOrders,
    getOrderClients,
    updateOrderClients,
    updateClientOrder,
    splitOrder
}
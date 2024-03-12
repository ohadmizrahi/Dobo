const pool = require('@be/database/pool.js');

async function findOne(orderId) {
    const query = `SELECT * FROM orders WHERE orderId = $1 LIMIT 1;`;
    const values = [orderId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findMany(virtualTableId) {
    const query = `SELECT * FROM orders WHERE virtualTable = $1;`;
    const values = [virtualTableId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function create(orderData) {
    const { itemId, virtualTable, payers, status } = orderData;
    try {
        const query = `
            INSERT INTO orders (itemId, virtualTable, payers, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [itemId, virtualTable, payers, status];
        const res = await pool.query(query, values)
        const order = res.rows[0];
        return { success: true, order, message: "Order created"}
    } 
    catch (error) {
        throw new Error('Order creation failed');
    }
}

async function createMany(ordersData) {
    const placeholders = [];
    const values = [];
    try {
        ordersData.forEach((order, index) => {
            const offset = index * 4;
            placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`);
            values.push(order.itemId, order.virtualTable, order.payers, order.status);
        });

        const query = `
        INSERT INTO orders (itemId, virtualTable, payers, status)
        VALUES ${placeholders.join(', ')}
        RETURNING *;
    `;
        const res = await pool.query(query, values)
        const orders = res.rows;
        return { success: true, orders, message: "Orders created"}
    } 
    catch (error) {
        throw new Error('Orders creation failed');
    }
}

async function getTableOrders(virtualTableId) {

    const query = `
    SELECT 
        o.orderId as orderId,
        o.itemId as itemId,
        i.name as itemName,
        i.description as itemDescription, 
        i.price as itemPrice,
        o.status as status, 
        o.ts as orderTimeStamp,
        payers.clients as clients
    FROM 
	    orders o 
		    JOIN items i ON o.itemId = i.itemId
			    JOIN (
				    SELECT co.orderId as orderId, json_agg(
                        json_build_object(
                            'clientId', c.clientId,
                            'clientName', a.fullName
						)
					) as clients
				    FROM clientOrders co 
					    JOIN clients c on co.clientId = c.clientId
					    JOIN accounts a on a.accountId = c.accountId
				    GROUP BY co.orderId
			    ) as payers ON o.orderId = payers.orderId 
    WHERE o.virtualTable = $1;`;
    const values = [virtualTableId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function getItemPrice(orderId) {
    
    const query = `
        SELECT i.price AS price
        FROM orders o
                JOIN items i ON o.itemId = i.itemId
        WHERE orderId = $1
        LIMIT 1
        `
    const values = [orderId];
    try {
        const res = await pool.query(query, values);
        if (res.rows.length === 0) {
            return null
        }
        return parseFloat(res.rows[0].price);
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

module.exports = {
    findOne,
    findMany,
    create,
    createMany,
    getTableOrders,
    getItemPrice
}
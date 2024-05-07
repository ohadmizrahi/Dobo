const pool = require('@be/connections/postgres.js');

async function findOne(clientId, onlyActive=false) {
    try {
        const query = onlyActive ? `SELECT * FROM clients WHERE clientId = $1 AND active = $2 LIMIT 1;` : `SELECT * FROM clients WHERE clientId = $1 LIMIT 1;`;
        const values = onlyActive ? [clientId, true] : [clientId]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findMany(virtualTableId, onlyActive=false) {
    try {
        const query = onlyActive ? 
        `SELECT * FROM clients WHERE virtualTable = $1 AND active = $2;` 
        : `SELECT * FROM clients WHERE virtualTable = $1;`;
        const values = onlyActive ? [virtualTableId, true] : [virtualTableId]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}


async function create(accountId, virtualTableId) {
    try {

        const query = `
            INSERT INTO clients (accountId, virtualTable)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const values = [accountId, virtualTableId];

        const res = await pool.query(query, values)
        const client = res.rows[0];

        return { success: true, client, message: "Client created" }
    } catch (error) {
        console.error(error);
        throw new Error(`Client Creation Failed:\n${error}`);
    }
}

async function disable(clientId) {

    query = `
    UPDATE clients
    SET active = $2 
    WHERE clientId = $1
    RETURNING clientId, virtualTable;`
    
    values = [clientId, false]
    try {
        const res = await pool.query(query, values);
        if (res.rows.length === 0) {
            return { success: false, message: "Client not found" }
        }
        const client = res.rows[0];

        return { success: true, client, message: "Client disabled" }
    } catch (error) {
        console.error(error);
        throw new Error(`Client disable Failed:\n${error}`);
    }
}

async function getTableClients(virtualTableId, active=false) {
    try {
        const query = 
        `
        SELECT 
            c.clientId AS clientId,
            a.fullName AS clientName,
            MAX(a.imageUrl) AS clientImage,
            c.active as active,
            COALESCE(SUM(CASE WHEN co.paid = true THEN co.cost ELSE 0 END), 0) AS paid,
            COALESCE(SUM(co.cost), 0) AS total
        FROM 
            clients c 
                JOIN accounts a ON c.accountId = a.accountId
                    LEFT JOIN clientOrders co ON c.clientId = co.clientId
        WHERE 
            c.virtualTable = $1 AND c.active = ANY($2::boolean[])
        GROUP BY 
            c.clientId, a.fullName;
        `;
        const values = [virtualTableId, active ? [true] : [true, false]];
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Get Table Clients failed:\n${error}`);
    }
}

module.exports = {
    findOne,
    findMany,
    create,
    disable,
    getTableClients
};
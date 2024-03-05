// const { pool } = require('@be/database/pool.js');
const pool = require('../../database/pool.js');

async function find(query, values=[]) {
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
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
    } 
    catch (error) {
        throw new Error(`Client Creation Failed:\n${error}`);
    }
}

async function update(clientId, field, value) {
    try {
        const fields = {
            "paid": {
                query: "UPDATE clients\
                        SET paid = $1\
                        WHERE clientId = $2\
                        RETURNING *;",
                values: [value, clientId]
            },
            "total": {
                query: "UPDATE clients\
                        SET total = $1\
                        WHERE clientId = $2\
                        RETURNING *;",
                values: [value, clientId]
            },
            "active": {
                query: "UPDATE clients\
                        SET active = $1\
                        WHERE clientId = $2\
                        RETURNING *;",
                values: [value, clientId]
            }
        }
        const { query, values } = fields[field];


        const res = await pool.query(query, values);
        const client = res.rows[0];

        if (!client) {
            return { success: false, message: "Client not found" }
        }

        return { success: true, client, message: "Client updated" }
    } 
    catch (error) {
        throw new Error(`Client Update Failed:\n${error}`);
    }
}

module.exports = {
    find,
    create,
    update
};
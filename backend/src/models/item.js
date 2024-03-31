const pool = require('@be/connections/postgres.js');

async function findOne(itemId) {
    const query = `SELECT * FROM items WHERE itemId = $1 LIMIT 1;`;
    const values = [itemId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findMany(businessId) {
    const query = `SELECT * FROM items WHERE businessId = $1;`;
    const values = [businessId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function create(businessId, itemData) {
    const { name, description, price, imageUrl } = itemData;
    try {

        const query = `
            INSERT INTO clients (businessId, name, description, price, image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const values = [businessId, name, description, price, imageUrl];

        const res = await pool.query(query, values)
        const item = res.rows[0];

        return { success: true, item, message: "Item created" }
    } catch (error) {
        console.error(error);
        throw new Error(`Item Creation Failed:\n${error}`);
    }
}

module.exports = {
    findOne,
    findMany,
    create
};
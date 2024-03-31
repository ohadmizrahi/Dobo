const pool = require('@be/connections/postgres.js');

async function select(query, values=[]) {
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

module.exports = { select };
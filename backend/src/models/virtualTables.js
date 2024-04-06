const pool = require('@be/connections/postgres.js');

async function find(virtualTableId, active=false) {
    const query = active ? `SELECT * FROM virtual_tables WHERE virtualTableId = $1;` : `SELECT * FROM virtual_tables WHERE virtualTableId = $1 AND active = $2;`;
    const values = active ? [virtualTableId] : [virtualTableId, true];
    try {
        const res = await pool.query(query, values);
        console.log('res:', res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function create(businessId, tableId) {
    try {
        const activeVirtualTable = await findActiveVirtualTable(businessId, tableId)
        if (activeVirtualTable) {
            return { success: false, message: 'Virtual Table already exists' };
        }
        const query = `
            INSERT INTO virtual_tables (businessId, tableId)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [businessId, tableId];
        const res = await pool.query(query, values)
        const virtualTable = res.rows[0];
        return { success: true, virtualTable, message: "Virtual Table created"}
    } 
    catch (error) {
        console.error(error);
        throw new Error(`Virtual Table creation failed\n${error}`);
    }
}

async function update(virtualTableId, name=null, active=null) {
    if (name === null && active === null) {
        return { success: false, message: "No update parameters provided" }
    }
    try {
        const query = `
            UPDATE virtual_tables
            SET name = COALESCE($2, name), active = COALESCE($3, active)
            WHERE virtualTableId = $1
            RETURNING *;
        `;
        const values = [virtualTableId, name, active];
        const res = await pool.query(query, values);
        if (res.rows.length === 0) {
            return { success: false, message: "Virtual Table not found" }
        }
        const virtualTable = res.rows[0];
        return { success: true, virtualTable, message: "Account updated"}
    } catch (error) {
        console.error(error);
        throw new Error(`Virtual Table update failed\n${error}`);
    }
}

async function findActiveVirtualTable(businessId, tableId) {
    const query = `
    SELECT *
    FROM virtual_tables
    WHERE businessId = $1 AND tableId = $2 AND active = $3
    `
    const values = [businessId, tableId, true]
    try {
        const res = await pool.query(query, values);
        if (res.rows.length === 1) {
            return res.rows[0];
        } else {
            return null;
        } 
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}


module.exports = {
    find,
    create,
    update,
    findActiveVirtualTable
}

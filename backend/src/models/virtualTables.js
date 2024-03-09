const { pool } = require('@be/database/pool.js');

async function find(virtualTableId, active=false) {
    const query = active ? `SELECT * FROM virtualTables WHERE virtualTableId = $1;` : `SELECT * FROM virtualTables WHERE virtualTableId = $1 AND active = $2;`;
    const values = active ? [virtualTableId] : [virtualTableId, true];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findActiveVirtualTable(businessId, tableId) {
    const virtualTables = await find("SELECT * FROM virtualTables WHERE businessId = $1 AND tableId = $2 AND active = $3", [businessId, tableId, true])
    if (virtualTables.length === 1) {
        return virtualTables[0];
    } else {
        return null;
    } 
}

async function create(businessId, tableId) {
    try {
        const activeVirtualTable = await findActiveVirtualTable(businessId, tableId)
        if (activeVirtualTable) {
            return { success: false, message: 'Virtual Table already exists' };
        }
        const query = `
            INSERT INTO virtualTables (businessId, tableId)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [businessId, tableId];
        const res = await pool.query(query, values)
        const virtualTable = res.rows[0];
        return { success: true, virtualTable, message: "Virtual Table created"}
    } 
    catch (error) {
        throw new Error('Virtual Table creation failed');
    }
}

async function update(virtualTableId, name=null, active=null) {
    if (!name && !active) {
        return { success: false, message: "No update parameters provided" }
    }
    try {
        const query = `
            UPDATE virtualTables
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
        throw new Error('Virtual Table update failed');
    }
}


module.exports = {
    find,
    create,
    update,
    findActiveVirtualTable
}

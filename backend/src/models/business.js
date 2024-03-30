const pool = require('@be/connections/postgres.js');

async function findOne(businessId) {
    try {
        const query = `
        SELECT * 
        FROM businesses 
        WHERE businessId = $1 
        LIMIT 1;`;
        const values = [businessId]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findMany(column='rank', order='DESC', limit=30, offset=0) {
    try {
        const query = `
        SELECT * 
        FROM businesses 
        ORDER BY ${column} ${order}
        LIMIT $1 
        OFFSET $2;`;
        const values = [limit, offset]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function findActivityTime(businessId) {
    try {
        const query = `
        SELECT businessId, json_agg(
            json_build_object(
                'day', bat.dayId,
                'open', bat.openTime,
                'close', bat.closeTime
            )
        ) as activityTime
        FROM businesses_activity_time bat
        WHERE businessId = $1
        GROUP BY businessId
        LIMIT 1;
        `
        const values = [businessId]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

module.exports = {
    findOne,
    findMany,
    findActivityTime
}
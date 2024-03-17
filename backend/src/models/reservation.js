const pool = require('@be/database/pool.js');

async function findAvailableTables(businessId, datetime, numOfPeople) {
    try {
        const query = `
        SELECT tableId as availableTable, numberOfPeople as maxSize
        FROM tables
        WHERE businessId = $1
            AND (numberOfPeople BETWEEN $2 AND $2 + 2)
            AND tableId NOT IN (
                SELECT tableId
                FROM reservations
                WHERE businessId = $1 
                AND (reservationdatetime BETWEEN $3::timestamp - INTERVAL '2 hours' AND $3::timestamp + INTERVAL '2 hours')
                )
`;
        const values = [businessId, numOfPeople, datetime]; 
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to find reservations: ${error}`);
    }
}

async function create(accountId, businessId, tableId, datetime, numOfPeople, type, additionalRequest) {
    try {
        const query = `
        INSERT INTO reservations (tableId, businessId, accountId, reservationdatetime, type, numberOfPeople, additionalRequest)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING reservationId;`;
        const values = [tableId, businessId, accountId, datetime, type, numOfPeople, additionalRequest];
        const res = await pool.query(query, values);
        const reservation = res.rows[0];
        return { success: true, reservation, message: "Reservation created"}
    } catch (error) {
        throw new Error(`Failed to create reservation: ${error}`);
    }
}

async function findMany(fields) {
    const validFields = ['businessId', 'accountId', 'reservationdatetime', 'type']
    try {
        const keys = Object.keys(fields);
        const invalidFields = keys.filter(key => !validFields.includes(key));
        if (invalidFields.length) {
            throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
        }
        const values = Object.values(fields);
        const whereClause = keys.map((key, i) => `r.${key} = $${i + 1}`).join(' AND ');
        const query = `
        SELECT
            r.reservationId,
            r.reservationdatetime::date::varchar as reservationdate,
            r.reservationdatetime::time as reservationtime,
            type, 
            numberOfPeople,
            b.name as businessName,
            b.city as businessCity,
            b.address as businessAddress
        FROM reservations r
            JOIN businesses b ON r.businessId = b.businessId
        WHERE ${whereClause}
        ORDER BY reservationdatetime DESC;`;

        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to find reservations: ${error}`);
    }
}

module.exports = {
    findAvailableTables,
    create,
    findMany
};
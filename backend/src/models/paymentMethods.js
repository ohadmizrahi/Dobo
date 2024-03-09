const { pool } = require('@be/database/pool.js');

async function find(accountId) {
    const query = `SELECT * FROM PaymentMethods WHERE accountId = $1;`;
    const values = [accountId];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function create(username, paymentMethodData) {
    const paymentMethods = await find(username);
    if (paymentMethods.length > 0) {
        return { success: false, username, message: "Payment method for this user already exists" }
    }

    try {
        const query = `
            INSERT INTO PaymentMethods (accountId, cardNumber, experationDate, cvv, citizenId, type)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const { cardNumber, experationDate, cvv, citizenId, type } = paymentMethodData;

        const values = [username, cardNumber, experationDate, cvv, citizenId, type];

        const res = await pool.query(query, values)
        const paymentMethod = res.rows[0];
        return { success: true, data: paymentMethod, message: "Payment method created"}
    } catch (error) {
        throw new Error('Payment method creation failed');
    }
}

async function update(username, fieldsToUpdate) {
    const { cardNumber, experationDate, cvv, citizenId, type } = fieldsToUpdate;
    const query = "UPDATE accounts\
                    SET\
                        cardNumber = COALESCE($2, cardNumber),\
                        experationDate = COALESCE($3, experationDate),\
                        cvv = COALESCE($4, cvv),\
                        citizenId = COALESCE($5, citizenId),\
                        type = COALESCE($6, type)\
                    WHERE accountId = $1\
                    RETURNING *;";

    const values = [username, cardNumber, experationDate, cvv, citizenId, type]
    
    try {
        const res = await pool.query(query, values);
        if (res.rows.length === 0) {
            return { success: false, message: "Payment Method not found" }
        }
        return { success: true, data: fieldsToUpdate, message: "Payment Method updated"}
    } catch (error) {
        throw new Error('Payment Method update failed');
    }
}

module.exports = { find, create, update }
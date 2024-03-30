const pool = require('@be/connections/postgres.js');

async function find(username) {
    const query = `SELECT * FROM accounts WHERE accountId = $1;`;
    const values = [username];
    try {
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to execute query:\n${error}`);
    }
}

async function create(username, accountData) {
    try {
        const rows = await find(username)
        if (rows.length == 1) {
            return { success: false, account: accountData, message: "Account already exists" }
        } else {
            if (rows.length > 1) {
                throw new Error("Account creation failed: multiple accounts with the same username")
            }
        }

        const query = `
            INSERT INTO accounts (fullName, phoneNumber, address, email, birthDate, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const { fullName, phoneNumber, address, email, birthDate, password } = accountData;

        const values = [fullName, phoneNumber, address, email, birthDate, password];

        const res = await pool.query(query, values)
        const account = res.rows[0];

        return { success: true, account, message: "Account created" }
    } catch (error) {
        console.error(error);
        throw new Error(`Account Creation Failed:\n${error}`);
    }
}

async function update(username, fieldsToUpdate, type) {
    const { fullName, phoneNumber, address, birthDate, password, imageUrl } = fieldsToUpdate;
    const fields = {
        "account": {
            query: "UPDATE accounts\
                    SET\
                        fullName = COALESCE($2, fullName),\
                        phoneNumber = COALESCE($3, phoneNumber),\
                        address = COALESCE($4, address),\
                        birthDate = COALESCE($5, birthDate)\
                    WHERE accountId = $1\
                    RETURNING *;",
            values: [username, fullName, phoneNumber, address, birthDate]
        },
        "password": {
            query: "UPDATE accounts\
                    SET password = $2\
                    WHERE accountId = $1\
                    RETURNING *;",
            values: [username, password]
        }, 
        "image": {
            query: "UPDATE accounts\
                    SET imageUrl = $2\
                    WHERE accountId = $1\
                    RETURNING *;",
            values: [username, imageUrl]
        }
    }

    try {
        const { query, values } = fields[type];
        const res = await pool.query(query, values);

        if (res.rows.length === 0) {
            return { success: false, message: "Account not found" }
        }
        
        return { success: true, updatedFields: fieldsToUpdate, message: "Account updated"}
    } catch (error) {
        console.error(error);
        throw new Error(`Account update failed\n${error}`);
    }
}

module.exports = { find, create, update }
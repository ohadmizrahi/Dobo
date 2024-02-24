const pool = require('./pool'); // Assuming pool.js is in the same directory

async function createTables(tableQueries) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const [tableName, query] of Object.entries(tableQueries)) {
            await client.query(query);
            console.log(`Table ${tableName} created successfully`);
        }

        await client.query('COMMIT');
        console.log('All tables created successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

/*
 ===== EXAMPLE OF USAGE ====
const tableQueries = {
    users: usersTableQuery,
}

const usersTableQuery =
    // Add the users table creation query here
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )`

createTables(tableQueries)
  .then(() => console.log('Table altered successfully'))
  .catch(console.error);
*/

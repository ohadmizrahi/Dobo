const pool = require('./pool');

async function alterTable(tableName, changes) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Apply each change to the table
    for (const change of changes) {
      const { action, column, type } = change;

      if (action === 'add') {
        await client.query(`ALTER TABLE ${tableName} ADD COLUMN ${column} ${type}`);
      } else if (action === 'modify') {
        await client.query(`ALTER TABLE ${tableName} ALTER COLUMN ${column} TYPE ${type}`);
      } else if (action === 'drop') {
        await client.query(`ALTER TABLE ${tableName} DROP COLUMN ${column}`);
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
 /*
 ===== EXAMPLE OF USAGE ====
const changes = [
  { action: 'add', column: 'bio', type: 'TEXT' },
  { action: 'modify', column: 'username', type: 'VARCHAR(100)' },
  { action: 'drop', column: 'temp_column' },
];

alterTable('Users', changes)
  .then(() => console.log('Table altered successfully'))
  .catch(console.error);
*/
module.exports = alterTable;


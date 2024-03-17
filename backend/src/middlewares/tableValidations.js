require('dotenv').config();
const { select: findClient } = require('@src/utils/query.js');


async function validateAccountWithoutOpenTables(req, res, next) {
    const username = req.user.username;
    try {
        const clients = await findClient("SELECT * FROM clients WHERE accountId = $1 AND active = $2", [username, true]);

        if (clients.length > 0) {
            return res.status(400).json({ message: 'Account is already logged in to an existing table', virtualTableId: clients[0].virtualtable});
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};



module.exports =  {
    validateAccountWithoutOpenTables
};
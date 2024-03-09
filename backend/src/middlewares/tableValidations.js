require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findOne } = require('@src/models/client.js');
const { select: findClient } = require('@src/utils/queries.js');


async function validateAccountWithoutOpenTables(req, res, next) {
    const username = req.user.username;
    try {
        const clients = await findClient("SELECT * FROM clients WHERE accountId = $1 AND active = $2", [username, true]);
        if (clients.length > 0) {
            return res.status(400).json({ message: 'Account is already logged in to an existing table', virtualTableId: virtualTable.virtualTableId});
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    } 
};

async function validateClientToken(req, res, next) {
    const { clientToken } = req.headers.clienttoken;
    if (!clientToken) {
        return res.status(400).json({ message: 'Client token is required' });
    } else {
        try {
            const decoded = jwt.verify(clientToken, process.env.CLIENT_SECRET_KEY);
            const clientId = decoded.clientId;
            const clients = await findOne(clientId, true);
            if (clients.length === 0) {
                return res.status(403).json({ message: 'Client is forbidden' });
            }
            req.client = clients[0];
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid client token' });
        }
    }
}

module.exports =  {
    validateAccountWithoutOpenTables,
    validateClientToken
};
const { findActiveClient } = require('@src/models/client.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validateAccountWithoutOpenTables(req, res, next) {
    const username = req.user.username;
    try {
        const virtualTable = await findActiveClient(username);
        if (virtualTable) {
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
            req.virtualTable = {
                virtualTableId: decoded.virtualTableId,
                clientId: decoded.clientId
            };
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
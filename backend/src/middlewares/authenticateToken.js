const jwt = require("jsonwebtoken");
const { findOne } = require('@src/models/client.js');

function authenticateUserToken(req, res, next) {
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    }

    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}

function authenticateResetPasswordToken(req, res, next) {
    let token = null;
    
    if (req.body && req.body.resetPasswordToken) {
        token = req.body.resetPasswordToken;
    }

    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.RESERT_PASSWORD_SECRET_KEY);
        req.resetPssword = 'authorized';
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}

async function authenticateClientToken(req, res, next) {
    const clientToken = req.headers.clienttoken;
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

module.exports = { 
    authenticateUserToken,
    authenticateResetPasswordToken,
    authenticateClientToken
};
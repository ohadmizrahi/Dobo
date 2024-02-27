const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    } else if (req.body && req.body.token) {
        token = req.body.token;
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

module.exports = { authenticateToken };
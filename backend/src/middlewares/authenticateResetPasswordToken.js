const jwt = require("jsonwebtoken");

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

module.exports = { authenticateResetPasswordToken };
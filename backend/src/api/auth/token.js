require('dotenv').config()
const jwt = require("jsonwebtoken");

function generateTokens(username) {
    const token =  jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    const tokenForRefresh = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '30d' });
    return { token, tokenForRefresh };
}

function refreshToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const username = decoded.username;
        const tokens = generateTokens(username)
        return tokens;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function extractToken(headers, body) {
    if (headers.authorization && headers.authorization.startsWith('Bearer')) {
        return headers.authorization.split(' ')[1]; // Bearer <token>
    } else if (body && body.token) {
        return body.token;
    }
    return null;
}

module.exports = {
    generateTokens,
    refreshToken,
    extractToken 
} 
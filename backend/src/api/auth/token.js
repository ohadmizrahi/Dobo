require('dotenv').config()
const jwt = require("jsonwebtoken");

function generateTokens(username) {
    const token =  jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    const tokenForRefresh = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '30d' });
    return { token, tokenForRefresh };
}

function refreshToken(decodedToken) {
    try {
        const username = decodedToken.username;
        const tokens = generateTokens(username)
        return tokens;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function resetPasswordToken(username) {
    if (!username) {
        return null;
    }
    return jwt.sign({ username }, process.env.RESERT_PASSWORD_SECRET_KEY, { expiresIn: '15m' });
}

module.exports = {
    generateTokens,
    refreshToken,
    resetPasswordToken
} 
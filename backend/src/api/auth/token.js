require('dotenv').config()
const jwt = require("jsonwebtoken");

function generateTokens(base, secret=process.env.SECRET_KEY, expiresIn="1d", RefreshToken={ expiresIn: "30d" }) {
    const token =  jwt.sign(base, secret, { expiresIn: expiresIn });
    if (Object.keys(RefreshToken).length === 0) {
        return { token };
    }
    const tokenForRefresh = jwt.sign(base, secret, RefreshToken);
    return { token, tokenForRefresh };
}


function resetPasswordToken(username) {
    if (!username) {
        return null;
    }
    return generateTokens({ username }, process.env.RESERT_PASSWORD_SECRET_KEY, '15m', {}).token
}

function generateClientToken(clientId) {
    return generateTokens({ clientId }, process.env.CLIENT_SECRET_KEY, "1d", { expiresIn: '1d' })
}

module.exports = {
    generateTokens,
    resetPasswordToken,
    generateClientToken
} 
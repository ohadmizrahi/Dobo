require('dotenv').config()
const jwt = require("jsonwebtoken");

function generateTokens(base, secret=process.env.SECRET_KEY, expiresIn="1h", withRefreshToken=true) {
    const token =  jwt.sign(base, secret, { expiresIn: expiresIn });
    if (!withRefreshToken) {
        return { token };
    }
    const tokenForRefresh = jwt.sign(base, secret, { expiresIn: '30d' });
    return { token, tokenForRefresh };
}

function refreshToken(decodedToken, secret=process.env.SECRET_KEY, expiresIn="1h") {
    try {
        const username = decodedToken.username;
        const tokens = generateTokens({ username }, secret, expiresIn, true)
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
    return generateTokens({ username }, process.env.RESERT_PASSWORD_SECRET_KEY, '15m', false).token
}

function generateClientToken(clientId, virtualTableId) {
    return generateTokens({ clientId, virtualTableId}, process.env.CLIENT_SECRET_KEY, "3h", true)
}

module.exports = {
    generateTokens,
    refreshToken,
    resetPasswordToken,
    generateClientToken
} 
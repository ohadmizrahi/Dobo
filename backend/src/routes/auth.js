const { Router } = require('express');
const { authentication } = require("@src/api/auth/login.js");
const { generateTokens, refreshToken, extractToken } = require("@src/api/auth/token.js");

const router = Router();
// create login process using jwt
// 1. create a route for login
// 2. create a route for register
// 3. create a route for logout
// 4. create a route for refresh token
// 5. create a route for protected resources
// 6. create a route for forgot password
// 7. create a route for reset password
// 8. create a route for change password
// 9. create a route for change email

router.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const authenticated = await authentication(username, password);
        if (authenticated) {
            const { token, tokenForRefresh } = generateTokens(username);
            if (!token || !tokenForRefresh) {
                new Error('Token generation failed');
            }
            res.status(200).json({ authenticated, token, tokenForRefresh, message: 'Authentication successful' });
        } else {
            res.status(401).json({ authenticated, message: 'Authentication failed' });
        }
    } catch (error) {
        // Handle the error here
        console.error(error);
        res.status(500).json({ error: 'An error occurred during authentication.' });
    }
});

router.post("/api/auth/token/refresh", (req, res) => {
    const reqToken  = extractToken(req.headers, req.body);
    try {
        const { token, tokenForRefresh } = refreshToken(reqToken)
        if (token && tokenForRefresh) {
            res.status(200).json({ success: true, token, tokenForRefresh, message: 'Token refresh successful' });
        } else {
            res.status(401).json({ success: false, message: 'Token refresh failed' });
        }
    } catch (error) {
        // Handle the error here
        console.error(error);
        res.status(500).json({ error: 'An error occurred during token refresh.' });
    }
});

module.exports = router;
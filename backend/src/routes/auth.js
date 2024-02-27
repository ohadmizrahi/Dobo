const { Router } = require('express');
const { authentication } = require("@src/api/auth/signin.js");
const { signup } = require("@src/api/auth/signup.js");
const { generateTokens, refreshToken } = require("@src/api/auth/token.js");
const { authenticateToken } = require("@src/middlewares/authenticateToken.js");


const router = Router();

router.post("/api/auth/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const authenticated = await authentication(username, password);
        if (authenticated) {
            const { token, tokenForRefresh } = generateTokens(username);
            if (!token || !tokenForRefresh) {
                throw new Error('Token generation failed');
            }
            res.status(200).json({ authenticated, token, tokenForRefresh, message: 'Authentication successful' });
        } else {
            res.status(401).json({ authenticated, message: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during authentication.' });
    }
});

router.post("/api/auth/signup", async (req, res) => {
    const { 
        name: fullName,
        email: email,
        phone: phoneNumber,
        address: address,
        birthday: birthDate,
        password: password
     } = req.body;
    
    try {
        const { success, username } = await signup({
            fullName,
            email,
            phoneNumber,
            address,
            birthDate,
            password
        });

        if (success) {
            const { token, tokenForRefresh } = generateTokens(username);
            if (!token || !tokenForRefresh) {
                throw new Error('Token generation failed');
            }
            res.status(200).json({ success, token, tokenForRefresh, message: 'Signup successful' });
        } else {
            res.status(409).json({ success, username, message: `Signup failed: Account already exists` });
        }
    } catch (error) {
        console.error(error);
        if (error.message === 'Invalid input') {
            res.status(400).json({ error: error.message, input: req.body });
        } else {
            res.status(500).json({ error: 'An error occurred during signup.' });
        }
    }
});

router.post("/api/auth/token/refresh", authenticateToken, (req, res) => {
    try {
        const { token, tokenForRefresh } = refreshToken(req.user)
        if (token && tokenForRefresh) {
            res.status(200).json({ success: true, token, tokenForRefresh, message: 'Token refresh successful' });
        } else {
            res.status(401).json({ success: false, message: 'Token refresh failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during token refresh.' });
    }
});


module.exports = router;
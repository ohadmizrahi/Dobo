const { Router } = require('express');
const { authenticateToken } = require("@src/middlewares/authenticateToken.js");
const { find: findUserAccount } = require('@src/models/account.js')
const { find: getUserPaymentMethod } = require('@src/models/paymentMethods.js')
const router = Router();

router.get("/api/profile", authenticateToken, async (req, res) => {
    const username = req.user.username;
    try {
        const account = await findUserAccount(username);
        const paymentsMethod = await getUserPaymentMethod(username);
        if (account) {
            const profile = {
                account,
                paymentsMethod
            }
            res.status(200).json({ data: profile });
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during fetching profile.' });
    }
});

module.exports = router;
const { Router } = require('express');
const multer = require('multer');
const { authenticateUserToken, authenticateResetPasswordToken } = require("@src/middlewares/authenticateToken.js");
const { updateAccountDetails, resetPassword, updateImage, getAccount, getAccountReservations } = require('@src/api/account/account.js');
const { updatedOrCreatePaymentMethod } = require('@src/api/account/paymentMethod.js');

const router = Router();

router.use(authenticateUserToken);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'usersImage/')
    },
    filename: function (req, file, cb) {
      cb(null, req.user.username + '-profile-' + Date.now())
    }
  }) 

const upload = multer({ storage: storage });

router.get("/api/profile", async (req, res) => {
    const username = req.user.username;
    const { account, paymentsMethod } = await getAccount(username);
    try {
        if (account) {
            const { reservations } = await getAccountReservations(username);
            const profile = {
                account,
                paymentsMethod,
                reservations
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

router.post("/api/profile/update/account", async (req, res) => {
    const username = req.user.username;
    const { fullName, phoneNumber, address, birthDate } = req.body;
    const fieldsToUpdate = { fullName, phoneNumber, address, birthDate }
    try {
        const response = await updateAccountDetails(username, fieldsToUpdate)
        if (!response.success) {
            res.status(400).json({ error: response.message, invalidFields: response.invalidFields});
        } else {
            res.status(200).json({ success: true, updatedFields: response.updatedFields });
        }
    }
    catch (error) {
        console.error(error);
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred during updating account.' });
        }
    }
});

router.post("/api/profile/update/payment-method", async (req, res) => {
    const username = req.user.username;
    const { cardNumber, experationDate, cvv, citizenId, type } = req.body;
    const fieldsToUpdate = { cardNumber, experationDate, cvv, citizenId, type };
    
    try {
        const response = await updatedOrCreatePaymentMethod(username, fieldsToUpdate)
        if (!response.success) {
            res.status(400).json({ error: response.message, invalidFields: response.invalidFields});
        } else {
            res.status(200).json({ success: true, updatedFields: response.updatedFields });
        }
    }
    catch (error) {
        console.error(error);
        if (error.message === 'Payment Method not found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === "Payment method for this user already exists") {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred during updating payment method.' });
        }
    }
});

router.post("/api/profile/update/password", authenticateResetPasswordToken, async (req, res) => {
    const username = req.user.username;
    const { password: newPassword } = req.body;
    try {   
        const response = await resetPassword(username, newPassword);
        if (response.success) {
            res.status(200).json({ success: true, updatedFields: response.updatedFields });
        }
    } 
    catch (error) {
        console.error(error);
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred during updating password.' });
        }
    }
});

router.post("/api/profile/update/image", upload.single('image'), async (req, res) => {
    const username = req.user.username;
    // const filename = req.file.filename;
    console.log({req});
    // console.log({filename});
    try {
        const response = await updateImage(username, filename)
        if (response.success) {
            res.status(200).json({ success: true, updatedFields: response.updatedFields });
        }
    }
    catch (error) {
        console.error(error);
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred during updating account.' });
        }
    }
});

module.exports = router;
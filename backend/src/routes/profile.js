const { Router } = require('express');
const multer = require('multer');
const { authenticateUserToken } = require("@src/middlewares/authenticateUserToken.js");
const { authenticateResetPasswordToken } = require("@src/middlewares/authenticateResetPasswordToken.js");
const { find: findUserAccount } = require('@src/models/account.js');
const { find: getUserPaymentMethod } = require('@src/models/paymentMethods.js')
const { updateAccountDetails, resetPassword, updatedPaymentMethod, updateImage } = require('@src/api/account/updateAccount.js');

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

router.post("/api/profile/update/account", async (req, res) => {
    const username = req.user.username;
    const fieldsToUpdate = req.body;
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
    const fieldsToUpdate = req.body;
    try {
        const response = await updatedPaymentMethod(username, fieldsToUpdate)
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
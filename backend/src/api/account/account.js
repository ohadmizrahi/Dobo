const { update: updateAccount, find: findAccount } = require('@src/models/account.js')
const { find: getUserPaymentMethod } = require('@src/models/paymentMethods.js')
const { validateSchema } = require('@src/utils/schema.js')

async function updateAccountDetails(username, fieldsToUpdate) {
    const schema = ["fullName", "phoneNumber", "address", "birthDate"];
    const invalidFields = validateSchema(schema, fieldsToUpdate);
    if (invalidFields.length) {
        return { success: false, invalidFields, message: 'Invalid fields to update' };
    }

    const response = await updateAccount(username, fieldsToUpdate, "account");
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: response.updatedFields, message: "Account updated"}
}

async function resetPassword(username, password) {
    const response = await updateAccount(username, {password: password}, "password");
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: { password: "*********" }, message: "Account updated"}
}

async function updateImage(username, image) {

    const response = await updateAccount(username, { image: image }, "image");
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: response.updatedFields, message: "Account updated"}
}

async function getAccount(username) {
    const accounts = await findAccount(username);
    const paymentsMethods = await getUserPaymentMethod(username);
    const account = accounts.length == 1 ? accounts[0] : null;
    const paymentsMethod = paymentsMethods.length == 1 ? paymentsMethods[0] : null;
    return { account, paymentsMethod }
}

module.exports = {
    updateAccountDetails,
    resetPassword,
    updateImage,
    getAccount
}
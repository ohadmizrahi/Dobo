const { update: updateAccount, find: findAccount } = require('@src/models/account.js')
const { find: getUserPaymentMethod } = require('@src/models/paymentMethods.js')
const { findMany: findReservations } = require('@src/models/reservation.js')

async function updateAccountDetails(username, fieldsToUpdate) {
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
    if (account) {
        account.birthdate.setDate(account.birthdate.getDate() + 1);
        account.birthdate = account.birthdate.toISOString().split('T')[0];
    }
    const paymentsMethod = paymentsMethods.length == 1 ? paymentsMethods[0] : null;
    if (paymentsMethod) {
        paymentsMethod.experationdate.setDate(paymentsMethod.experationdate.getDate() + 1);
        paymentsMethod.experationdate = paymentsMethod.experationdate.toISOString().split('T')[0];
    }
    return { account, paymentsMethod }
}

async function getAccountReservations(username) {
    const reservations = await findReservations({accountId: username});
    if (reservations.length === 0) {
        return { success: false, message: "No reservations found" }
    }
    return { success: true, reservations };
}

module.exports = {
    updateAccountDetails,
    resetPassword,
    updateImage,
    getAccount,
    getAccountReservations
}
const { update: updateAccount } = require('../../models/account.js')
const { update: updatePaymentMethod } = require('../../models/paymentMethods.js')
const { validateSchema } = require('../../utils/schema.js')

async function updateAccountDetails(username, fieldsToUpdate) {
    const schema = ["fullName", "phoneNumber", "address", "birthDate"];
    const invalidFields = validateSchema(schema, fieldsToUpdate);
    if (invalidFields.length) {
        return { success: false, invalidFields, message: 'Invalid fields to update' };
    }

    const response = await updateAccount(username, fieldsToUpdate);
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: response.updatedFields, message: "Account updated"}
}

async function resetPassword(username, password) {
    const response = await update(username, {password: password});
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: { password: "*********" }, message: "Account updated"}
}

async function updatedPaymentMethod(username, fieldsToUpdate) {
    const schema = ["cardNumber", "expiritionDate", "cvv", "citizenId", "type"];
    const invalidFields = validateSchema(schema, fieldsToUpdate);
    if (invalidFields.length) {
        return { success: false, invalidFields, message: 'Invalid fields to update' };
    }

    const response = await updatePaymentMethod(username, fieldsToUpdate);
    if (!response.success) {
        throw new Error(response.message);
    }
    const secureResponse = {
        cardNumber: "************" + response.updatedFields.cardNumber.slice(-4),
        expiritionDate: response.updatedFields.expiritionDate,
        cvv: "***",
        citizenId: "********",
        type: response.updatedFields.type
    }
    Object.keys(response.updatedFields).forEach(key => {
        response.updatedFields[key] = secureResponse[key];
    });
    return { success: true, updatedFields: response.updatedFields, message: "Payment Method updated"}
}

async function updateImage(username, image) {

    const response = await updateAccount(username, { image: image });
    if (!response.success) {
        throw new Error(response.message);
    }
    return { success: true, updatedFields: response.updatedFields, message: "Account updated"}
}

module.exports = {
    updateAccountDetails,
    resetPassword,
    updatedPaymentMethod,
    updateImage
}
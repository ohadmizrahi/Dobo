const { find, update } = require('@src/models/account.js')
const { validateSchema } = require('@src/utils/schema.js')

async function updateAccount(username, fieldsToUpdate) {
    const schema = ["fullName", "phoneNumber", "address", "birthDate"];
    const invalidFields = validateSchema(schema, fieldsToUpdate);
    if (invalidFields.length) {
        return { success: false, invalidFields, message: 'Invalid fields to update' };
    }

    const response = await update(username, fieldsToUpdate);
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

module.exports = {
    updateAccount,
    resetPassword
}
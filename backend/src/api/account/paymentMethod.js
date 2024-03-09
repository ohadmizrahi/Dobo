const { update, find, create } = require('@src/models/paymentMethods.js')

async function updatedOrCreatePaymentMethod(username, data) {
    const schema = ["cardNumber", "expiritionDate", "cvv", "citizenId", "type"];
    const invalidFields = validateSchema(schema, data);
    if (invalidFields.length) {
        return { success: false, invalidFields, message: 'Invalid fields to update' };
    }
    const response = await find(username);
    let operationResponse;
    if (response.length === 1) {
        operationResponse = await update(username, data);
    } else {
        operationResponse = await create(username, data);
    }

    if (!operationResponse.success) {
        throw new Error(operationResponse.message);
    }
    const secureResponse = {
        cardNumber: "************" + operationResponse.data.cardNumber.slice(-4),
        expiritionDate: operationResponse.data.expiritionDate,
        cvv: "***",
        citizenId: "********",
        type: operationResponse.data.type
    }
    Object.keys(operationResponse.data).forEach(key => {
        operationResponse.data[key] = secureResponse[key];
    });
    return { success: true, updatedFields: operationResponse.data, message: "Payment Method updated"}
}

module.exports = {
    updatedOrCreatePaymentMethod
}
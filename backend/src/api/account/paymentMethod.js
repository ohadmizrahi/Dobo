const { update, find, create } = require('@src/models/paymentMethods.js')

async function updatedOrCreatePaymentMethod(username, data) {
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
        cardNumber: "************" + operationResponse.data.cardnumber.slice(-4),
        expiritionDate: operationResponse.data.expiritiondate,
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
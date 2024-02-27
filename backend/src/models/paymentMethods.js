const paymentMethods = {
    "john.doe@gmail.com": {
        cardNumber: "John Doe",
        expiritionDate: "2026-09",
        cvv: "456",
        citizenId: "123456123",
        type: "Visa"
    },
    "jane.doe@gmail.com": {
        cardNumber: "Jane Doe",
        expiritionDate: "2025-07",
        cvv: "123",
        citizenId: "123456789",
        type: "Visa"
    }
}

async function find(username) {
    // find paymentMethod by username
    // ==== REPLACE WITH DATABASE CALL =====
    const paymentMethod = await paymentMethods[username]
    // ====================================
    const response = paymentMethod ? paymentMethod : null
    return response
}

async function create(username, paymentMethod) {
    if (await find(username)) {
        return { success: false, paymentMethod, message: "Payment method already exists" }
    }

    try {
        // create paymentMethod
        // ==== REPLACE WITH DATABASE CALL =====
        paymentMethods[username] = paymentMethod; // need to be async when use the DB
        // ====================================
        return { success: true, paymentMethod, message: "Payment method created"}
    } 
    catch (error) {
        throw new Error('Payment method creation failed');
    }
}

async function update(username, fieldsToUpdate) {
    const paymentMethod = await find(username);
    if (!paymentMethod) {
        return { success: false, message: "Payment Method not found" }
    }

    try {
        // update account
        // ==== REPLACE WITH DATABASE CALL =====
        paymentMethods[username] = {...paymentMethod, ...fieldsToUpdate}; // need to be async when use the DB
        // ====================================
        return { success: true, updatedFields: fieldsToUpdate, message: "Payment Method updated"}
    } 
    catch (error) {
        throw new Error('Payment Method update failed');
    }
}

module.exports = { find, create, update }
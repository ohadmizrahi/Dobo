const accounts = {
    "john.doe@gmail.com": {
        fullName: "John Doe",
        email: "john.doe@gmail.com",
        phoneNumber: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        birthDate: "1980-01-01",
        password: "password",
        image: null
    },
    "jane.doe@gmail.com": {
        fullName: "Jane Doe",
        email: "jane.doe@gmail.com",
        phoneNumber: "098-765-4321",
        address: "456 Elm St, Anytown, USA",
        birthDate: "1985-02-02",
        password: "password",
        image: null
    }
}

async function find(username) {
    // find account by username
    // ==== REPLACE WITH DATABASE CALL =====
    const account = await accounts[username]
    // ====================================
    const response = account ? account : null
    return response
}

async function create(username, account) {
    if (await find(username)) {
        return { success: false, account, message: "Account already exists" }
    }

    try {
        // create account
        // ==== REPLACE WITH DATABASE CALL =====
        accounts[username] = account; // need to be async when use the DB
        // ====================================
        return { success: true, account, message: "Account created"}
    } 
    catch (error) {
        throw new Error('Account creation failed');
    }
   
}

async function update(username, fieldsToUpdate) {
    const account = await find(username);
    if (!account) {
        return { success: false, message: "Account not found" }
    }

    try {
        // update account
        // ==== REPLACE WITH DATABASE CALL =====
        accounts[username] = {...account, ...fieldsToUpdate}; // need to be async when use the DB
        // ====================================
        return { success: true, updatedFields: fieldsToUpdate, message: "Account updated"}
    } 
    catch (error) {
        throw new Error('Account update failed');
    }
}

module.exports = { find, create, update }
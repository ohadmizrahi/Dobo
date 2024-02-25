users = {
    "admin@gmail.com": "password"
}

async function find(username) {
    // find user by username
    // ==== REPLACE WITH DATABASE CALL =====
    const password = await users[username]
    // ====================================
    const response = password ? { username, password } : { username, password: null }
    return response
}
module.exports = { find }
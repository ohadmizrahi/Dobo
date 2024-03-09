const { find } = require('@src/models/account.js')

async function authentication(email, password) {
    const accounts = await find(email)
    const account = accounts.length == 1 ? accounts[0] : null
    const realPassword =  account ? account.password : ''
    const authenticated = realPassword === password
    return authenticated
}

module.exports = {
    authentication
} 
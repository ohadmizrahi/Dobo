const { find } = require('@src/models/account.js')
// const { find } = require('../../models/account.js')

async function authentication(email, password) {
    const account = await find(email.toLowerCase())
    const resPassword =  account ? account.password : ''
    const authenticated = resPassword === password
    return authenticated
}

module.exports = {
    authentication
} 
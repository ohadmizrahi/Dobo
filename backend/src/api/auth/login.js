
const { find } = require('@src/models/user.js')
// const { find } = require('../../models/user.js')

async function authentication(email, password) {
    const { password: resPassword } = await find(email.toLowerCase())
    const authenticated = resPassword === password
    return authenticated
}

module.exports = {
    authentication
} 

const { create } = require('@src/models/account.js')
// const { create } = require('../../models/account.js')

async function signup(account) {
    if (!account.email || !account.password) {
        throw new Error('Invalid input');
    }
    const username = account.email
    const { success, account: resAccount, message } = await create(username, account)
    return { success, username: resAccount.email, message }
}





module.exports = {
    signup
} 
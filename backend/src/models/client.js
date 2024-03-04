const clients = [
    {
        accountId: "john.doe@gmail.com",
        virtualTableId: "abcd",
        paid: 0.00,
        total: 100.00,
        active: true
    },
    {
        accountId: "jane.doe@gmail.com",
        virtualTableId: "rtye",
        paid: 0.00,
        total: 100.00,
        active: false
    }
]

function find(clientId) {
    return clients.filter(client => client.accountId === clientId);
}

function findActiveClient(clientId) {
    return clients.find(client => client.accountId === clientId && client.active);
}

function create(clientId, virtualTableId) {
    try {

        const client = {
            accountId: clientId,
            virtualTableId,
            paid: 0.00,
            total: 0.00,
            active: true
        }
        // create client
        // ==== REPLACE WITH DATABASE CALL =====
        clients.push(client); // need to be async when use the DB
        // ====================================
        return { success: true, client, message: "Client created"}
    } 
    catch (error) {
        throw new Error('Client creation failed');
    }
}

module.exports = {
    find,
    create,
    findActiveClient
};
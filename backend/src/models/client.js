const clients = [
    {
        clientId: "1",
        accountId: "john.doe@gmail.com",
        virtualTableId: "abcd",
        paid: 0.00,
        total: 100.00,
        active: true
    },
    {   
        clientId: "2",
        accountId: "jane.doe@gmail.com",
        virtualTableId: "rtye",
        paid: 0.00,
        total: 100.00,
        active: false
    }
]

function find(clientId) {
    return clients.filter(client => client.clientId === clientId);
}

function findActiveClient(accountId) {
    return clients.find(client => client.accountId === accountId && client.active);
}

function findClientsByVirtualTable(virtualTableId) {
    return clients.filter(client => client.virtualTableId === virtualTableId);
}

function create(accountId, virtualTableId) {
    try {

        const client = {
            clientId: clients.length + 1,
            accountId: accountId,
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
    findActiveClient,
    findClientsByVirtualTable
};
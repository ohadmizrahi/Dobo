const virtualTables = [
    {
        virtualTableId: "abcd",
        businessId: "1234",
        tableId: "123",
        virtualTableName: "Test Table 1",
        active: true,
        creationTs: "2021-03-01T00:00:00.000Z"
    },
    {
        virtualTableId: "rtye",
        businessId: "7894",
        tableId: "789",
        virtualTableName: "Test Table 2",
        active: false,
        creationTs: "2021-03-01T00:00:00.000Z"
    }
]

function find(virtualTableId) {
    return virtualTables.find(virtualTable => virtualTable.virtualTableId === virtualTableId);
}

function findActiveVirtualTable(businessId, tableId) {
    return virtualTables.find(virtualTable => virtualTable.businessId === businessId && virtualTable.tableId === tableId && virtualTable.active);
}

function create(businessId, tableId) {
    try {
        if (findActiveVirtualTable(businessId, tableId)) {
            return { success: false, message: 'Virtual Table already exists' };
        }
        const virtualTableId = uuidv4();
        const virtualTable = {
            virtualTableId,
            businessId,
            tableId,
            virtualTableName: 'New Table: ' + virtualTableId,
            active: true,
            creationTs: new Date().toISOString()
        }
        // create virtual table
        // ==== REPLACE WITH DATABASE CALL =====
        virtualTables.push(virtualTable); // need to be async when use the DB
        // ====================================
        return { success: true, virtualTable, message: "Virtual Table created"}
    } 
    catch (error) {
        throw new Error('Virtual Table creation failed');
    }
}

module.exports = {
    find,
    create,
    findActiveVirtualTable
}

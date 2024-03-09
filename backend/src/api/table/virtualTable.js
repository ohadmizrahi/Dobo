const { create: joinVirtualTable, findOne: getClient, findMany: getClients } = require('@src/models/client.js');
const { 
    create: createVirtualTable,
    find: getVirtualTable,
    update: updateVirtualTable,
    getActiveVirtualTable 
} = require('@src/models/virtualTables.js');
const { findMany: getOrders } = require("@src/models/orders.js");


async function openOrJoinVirtualTable(username, businessId, tableId) {
    try {
        const {success, operation, virtualTable, message} = await getOrCreateVirtualTable(businessId, tableId);
        if (success) {
            const { success, client } = joinVirtualTable(username, virtualTable.virtualTableId);
            if (success) {
                return { success: true, client, operation, virtualTable };
            } else {
                return { success: false, message: 'Join Virtual Table failed' };
            }
        } else {
            return { success: false, message };
        }
    } catch (error) {
        throw new Error('Internal Serverl Error');
    }
}

async function getOrCreateVirtualTable(businessId, tableId) {
    try {
        const virtualTable = await getActiveVirtualTable(businessId, tableId);
        if (virtualTable) {
            return {success: true, operation: 'get', virtualTable};
        } else {
            const { success, virtualTable, message } = createVirtualTable(businessId, tableId);
            if (success) {
                return {success: true, operation: 'create', virtualTable};
            } else {
                return {success: false, message};
            }
        }
    } catch (error) {
        throw new Error('Get or Create Virtual Table failed');
    }
}

async function getVirtualTableInfo(virtualTableId) {
    try {
        const virtualTables = await getVirtualTable(virtualTableId, true);
        if (virtualTables.length === 1) {
            const orders = await getOrders(virtualTableId);
            const clients = await getClients(virtualTableId, true);
            return { success: true, virtualTable: virtualTables[0], orders, clients };
        } else {
            return { success: false, message: 'Virtual Table not found' };
        }
    } catch (error) {
        throw new Error('Get Virtual Table failed');
    }
}

async function updateVirtualTableName(virtualTableId, name) {
    try {
        const virtualTables = await getVirtualTable(virtualTableId);
        if (virtualTables.length === 1) {
            const { virtualTableId } = virtualTables[0];
            const { success, virtualTable, message } = updateVirtualTable(virtualTableId, name);
            if (success) {
                return { success: true, virtualTable };
            } else {
                return { success: false, message };
            }
        } else {
            return { success: false, message: 'Virtual Table not found' };
        }
    } catch (error) {
        throw new Error('Update Virtual Table failed');
    }
}

async function closeVirtualTable(virtualTableId) {
    try {
        const virtualTables = await getVirtualTable(virtualTableId);
        if (virtualTables.length === 1) {
            const { virtualTableId } = virtualTables[0];
            const { success, virtualTable, message } = updateVirtualTable(virtualTableId, null, false);
            if (success) {
                return { success: true, virtualTable };
            } else {
                return { success: false, message };
            }
        } else {
            return { success: false, message: 'Virtual Table not found' };
        }
    } catch (error) {
        throw new Error('Close Virtual Table failed');
    }
}

async function getClientBalance(clientId) {
    try {
        const clients = await getClient(clientId, true);
        if (clients.length === 1) {
            const { total, paid } = clients[0];
            const balance = total - paid;
            return { success: true, balance, message: 'Client balance retrieved successfully' };
        } else {
            return { success: false, message: 'Active client not found' };
        }
    } catch (error) {
        throw new Error('Get Client Balance failed');
    }
}

async function getClientItems(clientId) {
    try {
        const clients = await getClient(clientId, true);
        if (clients.length === 1) {
            const { total, paid } = clients[0];
            const balance = total - paid;
            return { success: true, balance, message: 'Client balance retrieved successfully' };
        } else {
            return { success: false, message: 'Active client not found' };
        }
    } catch (error) {
        throw new Error('Get Client Balance failed');
    }
}

module.exports = {
    openOrJoinVirtualTable,
    getVirtualTableInfo,
    updateVirtualTableName,
    closeVirtualTable,
    getClientBalance,
    getClientItems
};


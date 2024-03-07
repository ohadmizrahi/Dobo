const { create: joinVirtualTable } = require('@src/models/client.js');
const { create: createVirtualTable, findActiveVirtualTable } = require('@src/models/virtualTables.js');


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
        const virtualTable = await findActiveVirtualTable(businessId, tableId);
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
    } 
    catch (error) {
        throw new Error('Get or Create Virtual Table failed');
    }
}

module.exports = {
    openOrJoinVirtualTable
};


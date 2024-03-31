const { create: joinVirtualTable, getTableClients } = require('@src/models/client.js');
const { 
    create: createVirtualTable,
    find: getVirtualTable,
    update: updateVirtualTable,
    findActiveVirtualTable 
} = require('@src/models/virtualTables.js');
const { getTableOrders } = require("@src/models/order.js");


async function openOrJoinVirtualTable(username, businessId, tableId) {
    try {
        const {success, operation, virtualTable, message} = await getOrCreateVirtualTable(businessId, tableId);
        if (success) {
            const { success, client } = await joinVirtualTable(username, virtualTable.virtualtableid);
            if (success) {
                return { success: true, client, operation, virtualTable };
            } else {
                return { success: false, message: 'Join Virtual Table failed' };
            }
        } else {
            return { success: false, message };
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Internal Serverl Error\n${error}`);
    }
}

async function getOrCreateVirtualTable(businessId, tableId) {
    try {
        const virtualTable = await findActiveVirtualTable(businessId, tableId);
        if (virtualTable) {
            return {success: true, operation: 'get', virtualTable};
        } else {
            const { success, virtualTable, message } = await createVirtualTable(businessId, tableId);
            if (success) {
                await startTableConsumer(virtualTable.virtualtableid);
                return {success: true, operation: 'create', virtualTable};
            } else {
                return {success: false, message};
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Get or Create Virtual Table failed \n${error}`);
    }
}

async function startTableConsumer(virtualTableId) {
    const validResponses = [200, 201]
    try {
        response = await fetch(`http://127.0.0.1:8001/agents/start/${virtualTableId}`)
        const status = response.status;
        const response_data = await response.json();
        if (!validResponses.includes(status)){
            throw new Error(`${status}\n${response_data.error}`);
        }
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error(`Start Consumer Agent failed\n${error}`);
    }
}

async function stopTableConsumer(virtualTableId) {
    const validResponses = [200, 201]
    try {
        response = await fetch(`http://127.0.0.1:8001/agents/stop/${virtualTableId}`)
        const status = response.status;
        const response_data = await response.json();
        if (!validResponses.includes(status)) {
            if (status === 404) {
                return { success: false, message: 'Consumer Agent not found'};
            }
            throw new Error(`${status}\n${response_data.message}`);
        }
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error(`Stop Consumer Agent failed\n${error}`);
    }
}

async function getVirtualTableInfo(virtualTableId) {
    try {
        const virtualTables = await getVirtualTable(virtualTableId, true);
        if (virtualTables.length === 1) {
            const orders = await getTableOrders(virtualTableId);
            const clients = await getTableClients(virtualTableId);
            return { success: true, virtualTable: virtualTables[0], orders, clients };
        } else {
            return { success: false, message: 'Virtual Table not found' };
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Get Virtual Table failed \n${error}`);
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
        console.error(error);
        throw new Error(`Update Virtual Table failed\n${error}`);
    }
}

async function closeVirtualTable(virtualTableId) {
    try {
        const virtualTables = await getVirtualTable(virtualTableId);

        if (virtualTables.length === 1) {
            const { virtualtableid } = virtualTables[0];
            const { success, virtualTable, message } = await updateVirtualTable(virtualtableid, null, false);
            if (success) {
                const response = await stopTableConsumer(virtualtableid);
                if (!response.success) {
                    return { success: false, message: response.message };
                }
                return { success: true, virtualTable };
            } else {
                return { success: false, message };
            }
        } else {
            return { success: false, message: 'Virtual Table not found' };
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Close Virtual Table failed\n${error}`);
    }
}


module.exports = {
    openOrJoinVirtualTable,
    getVirtualTableInfo,
    updateVirtualTableName,
    closeVirtualTable
};


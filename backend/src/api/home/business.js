const { findOne: getBusiness, findMany: getBusinesses, findActivityTime } = require('@src/models/business.js');
const { getMenu } = require('@src/api/menu/item.js');
const { findAvailableTables, create: createReservation } = require('@src/models/reservation.js');

async function getGroupsOfBusinesses(groups, order='DESC', limit=30, offset=0) {
    const groupColMap = {
        'recommend': 'rank',
        'name': 'name',
        'new': 'ts'
    }
    const validOrders = ['ASC', 'DESC']
    if (!validOrders.includes(order)) {
        return { success: false, message: `Invalid order: ${column}`, order }
    }

    const groupsOfBusinesses = {}
    const failedGroups = [];

    try {
        for (const group of groups) {
            if (!groupColMap[group]) {
                failedGroups.push(group);
                continue;
            }
            const businesses = await getBusinesses(groupColMap[group], order, limit, offset);
            groupsOfBusinesses[group] = businesses;
        }
        if (failedGroups.length) {
            return { success: false, message: 'Invalid groups', failedGroups, groupsOfBusinesses };
        }
        return { success: true, groupsOfBusinesses };
    } catch (error) {
        throw new Error(`Failed to get businesses: ${error}`);
    }
}

async function getBusinessInfo(businessId) {
    try {
        const businessRes = await getBusiness(businessId);
        if (businessRes.length === 1) {
            const business = businessRes[0];
            const menuRes = await getMenu(businessId);
            const activityTimeRes = await findActivityTime(businessId);
            business.menu = menuRes.success ? menuRes.items : [];
            business.activityTime = activityTimeRes.length === 1 ? activityTimeRes[0].activitytime : [];

            return { success: true, info: business };
        } else {
            return { success: false, message: 'business not found' };
        }
    } catch (error) {
        throw new Error(`Failed to get business info: ${error}`);
    }
}

async function reserveTable(username, businessId, date, time, numOfPeople, type, specialRequests) {
    const datetime = `${date} ${time}`;
    try {
        const tables = await findAvailableTables(businessId, datetime, numOfPeople);
        if (tables.length === 0) {
            return { success: false, message: 'No available tables', request: { businessId, date, time, numOfPeople, type, specialRequests } };
        } else {
            const table = tables[0];
            const {success, reservation} = await createReservation(username, businessId, table.availabletable, datetime, numOfPeople, type, specialRequests);
            if (success) {
                return { success, reservation };
            } else {
                return { success, message: 'Failed to create reservation', request: { businessId, date, time, numOfPeople, type, specialRequests } };
            }
        }
    } catch (error) {
        throw new Error(`Failed to reserve table: ${error}`);
    }
}

module.exports = {
    getGroupsOfBusinesses,
    getBusinessInfo,
    reserveTable
}

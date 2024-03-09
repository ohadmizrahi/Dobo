const { findMany: getBusinessMenu } = require('@src/models/item.js');

async function getMenu(businessId) {
    try {
        const items = await getBusinessMenu(businessId);
        if (items.length === 0) {
            return { success: false, message: 'Menu for the business not found' };
        }
        return { success: true, items, message: 'Menu retrieved successfully'};
    } catch (error) {
        throw new Error('Failed to get menu');
    }
}

module.exports = {
    getMenu
}
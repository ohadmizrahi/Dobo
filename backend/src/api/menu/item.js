const { findMany: getBusinessMenu } = require('@src/models/item.js');

async function getMenu(businessId) {
    const itemGroups = {
        'food': [],
        'drinks': [],
        'dessert': [],
        'others': []
    };
    try {
        const items = await getBusinessMenu(businessId);
        if (items.length === 0) {
            return { success: false, message: 'Menu for the business not found' };
        }
        items.forEach(item => {
            if (itemGroups.hasOwnProperty(item.itemgroup)) {
                itemGroups[item.itemgroup].push(item);
            } else {
                itemGroups['others'].push(item);
            }
        });

        return { success: true, items: itemGroups, message: 'Menu retrieved successfully'};
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get menu');
    }
}

module.exports = {
    getMenu
}
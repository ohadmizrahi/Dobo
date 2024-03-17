const { Router } = require('express');
const { authenticateUserToken } = require("@src/middlewares/authenticateToken.js");
const { getGroupsOfBusinesses, getBusinessInfo, reserveTable } = require('@src/api/home/business.js');

const router = Router();

router.post('/api/home', async (req, res) => {
    try {
        const { groups, order, limit, offset } = req.body;
        const {
            success,
            groupsOfBusinesses,
            failedGroups,
            message
        } = await getGroupsOfBusinesses(groups, order, limit, offset);
        if (success) {
            res.status(200).json({ success, groups: groupsOfBusinesses});
        } else {
            res.status(400).json({ message, failedGroups, groups: groupsOfBusinesses });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/api/business/info', async (req, res) => {
    try {
        const { businessId } = req.body;
        const { success, info, message } = await getBusinessInfo(businessId);
        if (success) {
            res.status(200).json(info);
        } else {
            res.status(404).json({ message, businessId });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/api/business/reservation', authenticateUserToken, async (req, res) => {
    try {
        const username = req.user.username;
        const { 
            businessId,
            date,
            time,
            numOfPeople,
            preference,
            specialRequests
         } = req.body;
        const reservation = await reserveTable(username, businessId, date, time, numOfPeople, preference, specialRequests);
        if (reservation.success) {
            res.status(200).json({ success: reservation.success, reservation: reservation.reservation });
        } else {
            res.status(404).json({ message: reservation.message, request: reservation.request });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
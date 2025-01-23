const mongoose = require('mongoose');
const Aircon = require('../models/aircon');

const updateMaintenanceHistory = async function (doc) {
    try {
        const aircon = await Aircon.findById(doc.aircon);

        if (aircon) {
            // Check if the event ID is already in maintenanceHistory
            const exists = aircon.maintenanceHistory.includes(doc._id);
            if (!exists) {
                aircon.maintenanceHistory.push(doc._id);
                await aircon.save();
            }
        }
    } catch (error) {
        console.error('Error updating maintenance history:', error);
    }
};

module.exports = {
    updateMaintenanceHistory,
};

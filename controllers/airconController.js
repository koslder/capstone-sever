const Aircon = require('../models/aircon');

// Create a new Aircon
const createAircon = async (req, res) => {
    try {
        console.log('createAircon body:', req.body); // Log the incoming data

        // Support both single object and array payloads
        let result;
        if (Array.isArray(req.body)) {
            if (req.body.length === 0) return res.status(400).json({ message: 'Request body array is empty' });
            result = await Aircon.insertMany(req.body, { ordered: false }); // Bulk insert
            return res.status(201).json(result);
        }

        // Single object
        const payload = req.body;
        // Basic validation before creating (helps return clearer errors)
        const missing = [];
        if (!payload.brand) missing.push('brand');
        if (!payload.model) missing.push('model');
        if (!payload.serialNumber) missing.push('serialNumber');
        if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });

        const aircon = new Aircon(payload);
        result = await aircon.save();
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating aircons:', error);
        // If Mongoose validation error, return 400 with details
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error while creating aircon', error: error.message });
    }
};


const getAllAircon = async (req, res) => {
    try {
        const aircons = await Aircon.find();
        res.status(200).json(aircons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAirconById = async (req, res) => {
    try {
        const aircon = await Aircon.findById(req.params.id).populate({
            path: 'maintenanceHistory', // Populate the maintenanceHistory field
            options: { limit: 3, sort: { createdAt: -1 } }, // Limit to 3 latest entries and sort by newest
            populate: {
                path: 'technicians',
                select: 'firstname lastname',
            },
        });

        if (!aircon) {
            return res.status(404).json({ message: 'Aircon not found' });
        }

        res.status(200).json(aircon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const updateAircon = async (req, res) => {
    try {
        const updatedAircon = await Aircon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAircon) return res.status(404).json({ message: 'Aircon not found' });
        res.status(200).json(updatedAircon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteAircon = async (req, res) => {
    try {
        const deletedAircon = await Aircon.findByIdAndDelete(req.params.id);
        if (!deletedAircon) return res.status(404).json({ message: 'Aircon not found' });
        res.status(200).json({ message: 'Aircon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createAircon, getAllAircon, getAirconById, updateAircon, deleteAircon };
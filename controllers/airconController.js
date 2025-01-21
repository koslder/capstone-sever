const Aircon = require('../models/aircon');

// Create a new Aircon
const createAircon = async (req, res) => {
    try {
        const aircon = new Aircon(req.body);
        const savedAircon = await aircon.save();
        res.status(201).json(savedAircon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

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
        const aircon = await Aircon.findById(req.params.id);
        if (!aircon) return res.status(404).json({ message: 'Aircon not found' });
        res.status(200).json(aircon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
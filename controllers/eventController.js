const Event = require('../models/event');
const Aircon = require('../models/aircon');
const Admin = require('../models/admin');
const mongoose = require('mongoose');


const createEvent = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const eventData = req.body;

        // Check if Aircon exists
        const aircon = await Aircon.findById(eventData.aircon);
        if (!aircon) return res.status(404).json({ message: 'Aircon not found' });

        // Check if all technician IDs are valid
        const areValidTechnicians = eventData.technicians.every(id => mongoose.Types.ObjectId.isValid(id));
        if (!areValidTechnicians) {
            return res.status(400).json({ message: 'Invalid technician ID format' });
        }

        // Check if all technicians exist
        const technicians = await Admin.find({ '_id': { $in: eventData.technicians } });
        console.log('Technicians found:', technicians);

        if (technicians.length !== eventData.technicians.length) {
            return res.status(404).json({ message: 'One or more technicians not found' });
        }

        // Create the event
        const newEvent = await Event.create(eventData);

        // Check if the new event ID already exists in the maintenanceHistory array
        if (!aircon.maintenanceHistory.includes(newEvent._id)) {
            aircon.maintenanceHistory.push(newEvent._id);
        }

        // Save the updated aircon object
        await aircon.save();

        // Attach the combined history to the new event (if needed)
        newEvent.maintenanceHistory = aircon.maintenanceHistory;

        // Save the new event
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('aircon') // Populate Aircon details
            .populate('technicians', 'firstname lastname'); // Populate specific fields for technicians
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ message: error.message });
    }
};


const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('aircon');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Error fetching event' });
    }
};


const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

        // Remove event reference from aircon
        await Aircon.updateOne(
            { maintenanceHistory: id },
            { $pull: { maintenanceHistory: id } }
        );

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
};

const technicianAssinged = async (req, res) => {
    const { technicianId } = req.params;

    try {
        const events = await Event.find({ technicians: technicianId }).populate('aircon').populate('technicians');
        res.json(events);
    } catch (error) {
        console.error("Error fetching assigned events:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { createEvent, getAllEvents, deleteEvent, updateEvent, getEventById, technicianAssinged };
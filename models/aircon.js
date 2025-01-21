const mongoose = require('mongoose');

const AirconSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    location: { type: String },
    installationDate: { type: Date },
    status: { type: String, enum: ['Active', 'Inactive', 'Under Maintenance'], default: 'Active' },
    maintenanceHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Reference to Event model
}, { timestamps: true });

const Aircon = mongoose.model('Aircon', AirconSchema);

module.exports = Aircon;

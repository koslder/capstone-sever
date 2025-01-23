const mongoose = require('mongoose');
const { updateMaintenanceHistory } = require('../middlewares/eventMiddleware');

const EventSchema = new mongoose.Schema({
    aircon: { type: mongoose.Schema.Types.ObjectId, ref: 'Aircon', required: true },
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    technicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }],
    status: { type: String, enum: ['Scheduled', 'Completed', 'Canceled'], default: 'Completed' },
    notes: { type: String },
}, { timestamps: true });

EventSchema.post('save', async function (doc) {
    await updateMaintenanceHistory(doc);
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
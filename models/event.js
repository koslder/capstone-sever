const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    aircon: { type: mongoose.Schema.Types.ObjectId, ref: 'Aircon', required: true },
    title: { type: String, required: true },
    description: [{ type: String }],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    technicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }],
    status: { type: String, enum: ['Scheduled', 'Completed', 'Canceled'], default: 'Completed' },
    notes: { type: String },
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

function ensureCollection(collectionName) {
    const create = () => {
        if (!mongoose.connection.db) return;
        mongoose.connection.db.listCollections({ name: collectionName }).next((err, collinfo) => {
            if (err) {
                console.error(`Error listing collections for ${collectionName}:`, err);
                return;
            }
            if (!collinfo) {
                mongoose.connection.db.createCollection(collectionName, (err2) => {
                    if (err2) console.error(`Failed to create collection ${collectionName}:`, err2);
                    else console.log(`Created missing collection: ${collectionName}`);
                });
            }
        });
    };

    if (mongoose.connection && mongoose.connection.readyState === 1) {
        create();
    } else {
        mongoose.connection.once('open', create);
    }
}

ensureCollection('events');

module.exports = Event;
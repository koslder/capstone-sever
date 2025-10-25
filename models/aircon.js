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

ensureCollection('aircons');

module.exports = Aircon;

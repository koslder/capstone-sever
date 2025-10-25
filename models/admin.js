const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

const Admin = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String }
});


// Create and export model
const AdminModel = mongoose.model('Admin', Admin);

// Ensure collection exists; if not, create it
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

ensureCollection('admins');

module.exports = AdminModel;

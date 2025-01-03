const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: String }, // Change to String
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String }
});

module.exports = mongoose.model('Admin', Admin);

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

Admin.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Admin', Admin);

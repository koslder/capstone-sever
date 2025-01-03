const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    menuItem: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedTime: {
        type: String,
        required: true,
        trim: true
    },
    imageLink: {
        type: String,
        required: true,
        match: [/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/, 'Please enter a valid image URL']
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('Menu', Menu);

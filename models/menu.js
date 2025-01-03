const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    menuItem: {
        type: String,

    },
    price: {
        type: Number,

    },
    estimatedTime: {
        type: String,

    },
    imageLink: {
        type: String,
        match: [/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/, 'Please enter a valid image URL']
    }
});


module.exports = mongoose.model('Menu', Menu);

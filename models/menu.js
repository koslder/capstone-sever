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
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const MenuModel = mongoose.model('Menu', Menu);

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

ensureCollection('menus');

module.exports = MenuModel;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: `${process.env.MONGO_URI} Atam bobo`,
        additionalMessage: 'Welcome to my server.',
        serverStatus: 'Active',
        uptime: process.uptime()  // Optionally, show server uptime
    });
});


// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

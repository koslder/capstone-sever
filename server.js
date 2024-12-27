import Admin from '../models/admin.js';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api', userRoutes);  // Set up API endpoint prefix

// Basic test route to verify if the server is running
app.get('/', (req, res) => res.send('Hello, World!'));

app.post('/api/admin', async (req, res) => {
    const admin = req.body;

    if (!admin.email || !admin.username || !admin.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newAdmin = new Admin(admin);

    try {
        await newAdmin.save();
        res.status(202).json({ success: true, message: "New Admin has been created!" });
    } catch (error) {
        console.log("Error on creating new Admin!");
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

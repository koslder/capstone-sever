const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api', userRoutes); // Use `/api` prefix for all routes

// Default route - redirect to frontend URL in production, or send API status in development
app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        // Redirect to your deployed frontend URL
        res.redirect(process.env.VITE_API_URL || `http://localhost:${PORT}`);
    } else {
        // Return API status for development
        res.json({
            status: 'API is running',
            environment: process.env.NODE_ENV || 'development'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});


const express = require('express');
const router = express.Router();
const { getAdmin, createAdmin } = require('../controllers/adminController');

// Define routes
router.get('/admins', getAdmin);       // Route to get all users
router.post('/admins', createAdmin);    // Route to create a new user
router.post('/admins/:id', createAdmin);    // Route to create a new user

module.exports = router;

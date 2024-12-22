const express = require('express');
const router = express.Router();
const { getAdmin, createAdmin, loginUser } = require('../controllers/adminController');

// Define routes
router.get('/admins', getAdmin);       // Route to get all users
router.post('/admins', createAdmin);    // Route to create a new user
router.get('/login', loginUser);    // Route to Login

module.exports = router;

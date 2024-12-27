const express = require('express');
const router = express.Router();
const { getAdmin, createAdmin, deleteAdmin } = require('../controllers/adminController');

// Define routes
router.get('/admins', getAdmin);       // Route to get all users
router.post('/admins', createAdmin);    // Route to create a new user
router.delete('/admins/:id', deleteAdmin);    // Route to delete a user

module.exports = router;

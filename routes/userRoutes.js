const express = require('express');
const router = express.Router();
const {
    getAdmin,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin
} = require('../controllers/adminController');

// Define routes
router.get('/admins', getAdmin);       // Route to get all admin
router.post('/admins', createAdmin);    // Route to create a new admin
router.delete('/admins/:id', deleteAdmin);    // Route to delete a admin
router.get('/admins/:id', getAdminById);       // Route to get specific admin
router.patch('/admins/:id', updateAdmin);       // Route to get specific admin

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getAdmin,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin
} = require('../controllers/adminController');

const {
    getMenu,
    createMenu,
    deleteMenu,
    getMenuById,
    updateMenu
} = require('../controllers/menuController');

// Admins
router.get('/admins', getAdmin);
router.post('/admins', createAdmin);
router.delete('/admins/:id', deleteAdmin);
router.get('/admins/:id', getAdminById);
router.patch('/admins/:id', updateAdmin);

// Menus
router.get('/menu', getMenu);
router.post('/menu', createMenu);
router.delete('/menu/:id', deleteMenu);
router.get('/menu/:id', getMenuById);
router.patch('/menu/:id', updateMenu);

module.exports = router;

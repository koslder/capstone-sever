const express = require('express');
const router = express.Router();

// Admin/employee
const {
    getAdmin,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin
} = require('../controllers/adminController');

// Menu
const {
    getMenu,
    createMenu,
    deleteMenu,
    getMenuById,
    updateMenu
} = require('../controllers/menuController');

// Aircon
const {
    getAllAircon,
    createAircon,
    deleteAircon,
    getAirconById,
    updateAircon
} = require('../controllers/airconController');

// Events
const {
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    getEventById
} = require('../controllers/eventController');

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

// Aircons
router.get('/aircon', getAllAircon);
router.post('/aircon', createAircon);
router.delete('/aircon/:id', deleteAircon);
router.get('/aircon/:id', getAirconById);
router.patch('/aircon/:id', updateAircon);

// Events
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/:id', getEventById);
router.patch('/events/:id', updateEvent);

module.exports = router;

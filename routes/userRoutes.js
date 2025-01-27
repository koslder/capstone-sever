const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// Admin/Employee
const {
    getAdmin,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin,
    loginAdmin,
} = require('../controllers/adminController');

// Menu
const {
    getMenu,
    createMenu,
    deleteMenu,
    getMenuById,
    updateMenu,
} = require('../controllers/menuController');

// Aircon
const {
    getAllAircon,
    createAircon,
    deleteAircon,
    getAirconById,
    updateAircon,
} = require('../controllers/airconController');

// Events
const {
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    getEventById,
} = require('../controllers/eventController');

// Public Routes
router.post('/login', loginAdmin); // Login is public

// Protected Admin Routes
// router.use(verifyToken, verifyAdmin); // Apply middleware for routes below

router
    .route('/admins')
    .get(getAdmin)
    .post(createAdmin);

router
    .route('/admins/:id')
    .get(getAdminById)
    .patch(updateAdmin)
    .delete(deleteAdmin);

// Menus
router
    .route('/menu')
    .get(getMenu)
    .post(createMenu);

router
    .route('/menu/:id')
    .get(getMenuById)
    .patch(updateMenu)
    .delete(deleteMenu);

// Aircons
router
    .route('/aircon')
    .get(getAllAircon)
    .post(createAircon);

router
    .route('/aircon/:id')
    .get(getAirconById)
    .patch(updateAircon)
    .delete(deleteAircon);

// Events
router
    .route('/events')
    .get(getAllEvents)
    .post(createEvent);

router
    .route('/events/:id')
    .get(getEventById)
    .patch(updateEvent)
    .delete(deleteEvent);

module.exports = router;

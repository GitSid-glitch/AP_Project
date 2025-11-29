const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { getUsers, getEvents, updateEventStatus } = require('../controllers/adminController');

const router = express.Router();

// All routes here are protected and require Admin role
router.use(isAuthenticated, isAdmin);

router.get('/users', getUsers);
router.get('/events', getEvents);
router.put('/events/:id/status', updateEventStatus);

module.exports = router;

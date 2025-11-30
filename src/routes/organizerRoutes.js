const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
    createEvent,
    getMyEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventAttendees
} = require('../controllers/eventController');

// All routes require authentication and Organizer role
router.use(authenticateToken, authorizeRole('Organizer'));

// Event CRUD
router.post('/events', createEvent);
router.get('/events', getMyEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent); // Using PUT for update, could be PATCH
router.delete('/events/:id', deleteEvent);

// Attendee Management
router.get('/events/:id/attendees', getEventAttendees);

module.exports = router;

const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { getAllEvents, rsvpEvent, getMyBookings, cancelBooking } = require('../controllers/studentController');

const router = express.Router();

// Apply isAuthenticated to all student routes (as per plan/requirement)
// "Apply the isAuthenticated middleware... to ensure only logged-in users can RSVP"
// I decided to apply it to all for consistency in "Student Module".
router.use(isAuthenticated);

router.get('/events', getAllEvents);
router.post('/rsvp/:eventId', rsvpEvent);
router.get('/my-bookings', getMyBookings);
router.delete('/bookings/:bookingId', cancelBooking);

module.exports = router;

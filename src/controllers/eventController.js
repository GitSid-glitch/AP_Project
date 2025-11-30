const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Event
const createEvent = async (req, res) => {
    const { title, date, time, venue, category, capacity, description } = req.body;
    const organizerId = req.user.id;

    // Basic validation
    if (!title || !date || !time || !venue || !category || !capacity) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date), // Ensure date is a DateTime object
                time,
                venue,
                category,
                capacity: parseInt(capacity),
                isApproved: false, // Default to pending
                organizerId: organizerId
            }
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get All My Events
const getMyEvents = async (req, res) => {
    const organizerId = req.user.id;

    try {
        const events = await prisma.event.findMany({
            where: { organizerId: organizerId },
            include: {
                _count: {
                    select: { registrations: true }
                }
            }
        });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get Single Event
const getEventById = async (req, res) => {
    const { id } = req.params;
    const organizerId = req.user.id;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: {
                _count: {
                    select: { registrations: true }
                }
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizerId !== organizerId) {
            return res.status(403).json({ message: 'Unauthorized. You do not own this event.' });
        }

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Event
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const organizerId = req.user.id;
    const { title, date, time, venue, category, capacity, description } = req.body;

    try {
        const existingEvent = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (existingEvent.organizerId !== organizerId) {
            return res.status(403).json({ message: 'Unauthorized. You do not own this event.' });
        }

        // Prepare update data
        const updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (date) updateData.date = new Date(date);
        if (time) updateData.time = time;
        if (venue) updateData.venue = venue;
        if (category) updateData.category = category;
        if (capacity) updateData.capacity = parseInt(capacity);

        // Reset approval if significant changes (optional, but good practice)
        // Here we reset it if any field is updated for simplicity, or we could be more granular.
        updateData.isApproved = false;

        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const organizerId = req.user.id;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizerId !== organizerId) {
            return res.status(403).json({ message: 'Unauthorized. You do not own this event.' });
        }

        // Delete associated registrations first (manual cascade)
        await prisma.registration.deleteMany({
            where: { eventId: parseInt(id) }
        });

        await prisma.event.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get Attendee List
const getEventAttendees = async (req, res) => {
    const { id } = req.params;
    const organizerId = req.user.id;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizerId !== organizerId) {
            return res.status(403).json({ message: 'Unauthorized. You do not own this event.' });
        }

        const registrations = await prisma.registration.findMany({
            where: { eventId: parseInt(id) },
            include: {
                student: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        const attendees = registrations.map(reg => reg.student);

        res.status(200).json(attendees);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createEvent,
    getMyEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventAttendees
};

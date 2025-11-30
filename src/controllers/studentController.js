const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllEvents = async (req, res) => {
    const { search } = req.query;
    try {
        const where = {
            isApproved: true
        };

        if (search) {
            where.OR = [
                { title: { contains: search } }, 
                { description: { contains: search } }
            ];
        }

        const events = await prisma.event.findMany({
            where,
            include: {
                organizer: {
                    select: { name: true, email: true }
                }
            }
        });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const rsvpEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(eventId) },
            include: {
                registrations: true // To count registrations
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.isApproved) {
            return res.status(400).json({ message: 'Event is not open for booking' });
        }

        // Check Double Booking
        const existingRegistration = await prisma.registration.findUnique({
            where: {
                userId_eventId: {
                    userId: userId,
                    eventId: parseInt(eventId)
                }
            }
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        // Check Capacity
        const registrationCount = await prisma.registration.count({
            where: { eventId: parseInt(eventId) }
        });

        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event Full' });
        }

        // Create Registration
        const registration = await prisma.registration.create({
            data: {
                userId: userId,
                eventId: parseInt(eventId),
                status: 'CONFIRMED'
            }
        });

        res.status(201).json({ message: 'Booking confirmed', registration });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getMyBookings = async (req, res) => {
    const userId = req.user.id;
    try {
        const registrations = await prisma.registration.findMany({
            where: { userId: userId },
            include: {
                event: {
                    include: {
                        organizer: {
                            select: { name: true, email: true }
                        }
                    }
                }
            }
        });
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    try {
        const registration = await prisma.registration.findUnique({
            where: { id: parseInt(bookingId) }
        });

        if (!registration) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (registration.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
        }

        await prisma.registration.delete({
            where: { id: parseInt(bookingId) }
        });

        res.status(200).json({ message: 'Booking cancelled successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getAllEvents,
    rsvpEvent,
    getMyBookings,
    cancelBooking
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllEvents = async (req, res) => {
    const { search } = req.query;
    try {
        const where = {
            status: 'APPROVED'
        };

        if (search) {
            where.OR = [
                { title: { contains: search } }, // Removed mode: 'insensitive' for MySQL compatibility if needed, but Prisma usually handles it. 
                // Actually, MySQL default collation is often case-insensitive, but let's stick to simple contains.
                // If user wants case insensitive explicitly in Prisma with MySQL, it depends on collation.
                // I'll just use contains.
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
                bookings: true // To count bookings
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.status !== 'APPROVED') {
            return res.status(400).json({ message: 'Event is not open for booking' });
        }

        // Check Double Booking
        const existingBooking = await prisma.booking.findUnique({
            where: {
                userId_eventId: {
                    userId: userId,
                    eventId: parseInt(eventId)
                }
            }
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        // Check Capacity
        // Note: event.bookings might be large, better to use count or aggregate if possible, 
        // but include: bookings is okay for small scale. 
        // Better approach: prisma.booking.count({ where: { eventId: ... } })
        const bookingCount = await prisma.booking.count({
            where: { eventId: parseInt(eventId) }
        });

        if (bookingCount >= event.capacity) {
            return res.status(400).json({ message: 'Event Full' });
        }

        // Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId: userId,
                eventId: parseInt(eventId),
                status: 'CONFIRMED'
            }
        });

        res.status(201).json({ message: 'Booking confirmed', booking });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getMyBookings = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookings = await prisma.booking.findMany({
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
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(bookingId) }
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
        }

        await prisma.booking.delete({
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

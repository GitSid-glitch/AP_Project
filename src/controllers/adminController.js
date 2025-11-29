const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
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

const updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    try {

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data: { status: status } 
        });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getUsers,
    getEvents,
    updateEventStatus
};

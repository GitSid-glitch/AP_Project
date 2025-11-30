const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:3001/api';

async function runTests() {
    console.log('Starting Organizer API Tests...');

    // 1. Create Organizer User
    const email = `organizer_${Date.now()}@test.com`;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Creating test organizer: ${email}`);
    const organizer = await prisma.user.create({
        data: {
            name: 'Test Organizer',
            email: email,
            password: hashedPassword,
            role: 'Organizer'
        }
    });

    // 2. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!loginRes.ok) {
        console.error('Login failed:', await loginRes.text());
        return;
    }

    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful, token received.');

    // 3. Create Event
    console.log('Creating Event...');
    const eventData = {
        title: 'Test Event',
        description: 'This is a test event',
        date: '2023-12-25T10:00:00Z',
        time: '10:00 AM',
        venue: 'Test Venue',
        category: 'Workshop',
        capacity: 100
    };

    const createRes = await fetch(`${BASE_URL}/organizer/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
    });

    if (!createRes.ok) {
        console.error('Create Event failed:', await createRes.text());
        return;
    }

    const createData = await createRes.json();
    const eventId = createData.event.id;
    console.log(`Event created with ID: ${eventId}`);

    // 4. Get My Events
    console.log('Getting My Events...');
    const listRes = await fetch(`${BASE_URL}/organizer/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const listData = await listRes.json();
    console.log(`Found ${listData.length} events.`);
    const found = listData.find(e => e.id === eventId);
    if (found) {
        console.log('Created event found in list.');
    } else {
        console.error('Created event NOT found in list.');
    }

    // 5. Update Event
    console.log('Updating Event...');
    const updateRes = await fetch(`${BASE_URL}/organizer/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Updated Test Event' })
    });

    if (updateRes.ok) {
        const updateData = await updateRes.json();
        console.log('Event updated:', updateData.event.title);
    } else {
        console.error('Update failed:', await updateRes.text());
    }

    // 6. Delete Event
    console.log('Deleting Event...');
    const deleteRes = await fetch(`${BASE_URL}/organizer/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (deleteRes.ok) {
        console.log('Event deleted successfully.');
    } else {
        console.error('Delete failed:', await deleteRes.text());
    }

    // Cleanup
    await prisma.user.delete({ where: { id: organizer.id } });
    console.log('Test user cleaned up.');
    console.log('Tests Completed.');
}

runTests()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

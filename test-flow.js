const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const BASE_URL = 'https://ap-project-srvv.onrender.com/api';

async function runTests() {
    console.log('Starting Event Visibility Flow Verification...');

    // --- SETUP ---
    const timestamp = Date.now();
    const orgEmail = `org_${timestamp}@test.com`;
    const adminEmail = `admin_${timestamp}@test.com`;
    const studentEmail = `student_${timestamp}@test.com`;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating test users...');
    const [organizer, admin, student] = await Promise.all([
        prisma.user.create({ data: { name: 'Test Org', email: orgEmail, password: hashedPassword, role: 'Organizer' } }),
        prisma.user.create({ data: { name: 'Test Admin', email: adminEmail, password: hashedPassword, role: 'Admin' } }),
        prisma.user.create({ data: { name: 'Test Student', email: studentEmail, password: hashedPassword, role: 'Student' } })
    ]);

    // --- LOGIN ---
    console.log('Logging in users...');
    const [orgToken, adminToken, studentToken] = await Promise.all([
        login(orgEmail, password),
        login(adminEmail, password),
        login(studentEmail, password)
    ]);

    // --- STEP 1: ORGANIZER CREATES EVENT ---
    console.log('\n--- Step 1: Organizer Creates Event ---');
    const eventData = {
        title: `Flow Test Event ${timestamp}`,
        description: 'Testing visibility flow',
        date: '2025-12-25T10:00:00Z',
        time: '10:00 AM',
        venue: 'Test Venue',
        category: 'Tech',
        capacity: 50
    };

    const createRes = await fetch(`${BASE_URL}/organizer/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${orgToken}` },
        body: JSON.stringify(eventData)
    });
    let eventId;
    const createText = await createRes.text();
    try {
        const createJson = JSON.parse(createText);
        eventId = createJson.event.id;
        console.log(`Event Created: ID ${eventId}`);
    } catch (e) {
        console.error('Failed to parse create response:', createText.substring(0, 200));
        throw e;
    }

    // --- STEP 2: VERIFY ORGANIZER VISIBILITY ---
    console.log('\n--- Step 2: Verify Organizer Visibility ---');
    const orgEvents = await fetchGet(`${BASE_URL}/organizer/events`, orgToken);
    const orgSee = orgEvents.find(e => e.id === eventId);
    console.log(`Organizer sees event? ${!!orgSee}`);
    if (!orgSee) throw new Error('Organizer cannot see their own event');

    // --- STEP 3: VERIFY ADMIN VISIBILITY (PENDING) ---
    console.log('\n--- Step 3: Verify Admin Visibility (Pending) ---');
    const adminEvents = await fetchGet(`${BASE_URL}/admin/events`, adminToken);
    const adminSee = adminEvents.find(e => e.id === eventId);
    console.log(`Admin sees event? ${!!adminSee}`);
    console.log(`Event Status: ${adminSee?.isApproved ? 'APPROVED' : 'PENDING'}`);
    if (!adminSee) throw new Error('Admin cannot see the event');
    if (adminSee.isApproved) throw new Error('Event should be pending initially');

    // --- STEP 4: VERIFY STUDENT VISIBILITY (SHOULD BE HIDDEN) ---
    console.log('\n--- Step 4: Verify Student Visibility (Should be Hidden) ---');
    const studentEventsBefore = await fetchGet(`${BASE_URL}/student/events`, studentToken);
    const studentSeeBefore = studentEventsBefore.find(e => e.id === eventId);
    console.log(`Student sees event? ${!!studentSeeBefore}`);
    if (studentSeeBefore) throw new Error('Student sees pending event! Security Issue.');

    // --- STEP 5: ADMIN APPROVES EVENT ---
    console.log('\n--- Step 5: Admin Approves Event ---');
    const approveRes = await fetch(`${BASE_URL}/admin/events/${eventId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
        body: JSON.stringify({ isApproved: true })
    });
    if (!approveRes.ok) throw new Error('Admin approval failed');
    console.log('Event Approved.');

    // --- STEP 6: VERIFY STUDENT VISIBILITY (SHOULD BE VISIBLE) ---
    console.log('\n--- Step 6: Verify Student Visibility (Should be Visible) ---');
    const studentEventsAfter = await fetchGet(`${BASE_URL}/student/events`, studentToken);
    const studentSeeAfter = studentEventsAfter.find(e => e.id === eventId);
    console.log(`Student sees event? ${!!studentSeeAfter}`);
    if (!studentSeeAfter) throw new Error('Student cannot see approved event!');

    console.log('\n--- SUCCESS: Full Flow Verified ---');

    // --- CLEANUP ---
    console.log('Cleaning up...');
    await prisma.registration.deleteMany({ where: { eventId: eventId } });
    await prisma.event.delete({ where: { id: eventId } });
    await prisma.user.deleteMany({ where: { id: { in: [organizer.id, admin.id, student.id] } } });
}

async function login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Login failed for ${email}: ${data.message}`);
    return data.token;
}

async function fetchGet(url, token) {
    const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Fetch failed: ${url} ${res.status}`);
    return await res.json();
}

runTests()
    .catch(e => {
        console.error('\n!!! TEST FAILED !!!');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

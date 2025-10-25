const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

dotenv.config();

const Admin = require('../models/admin');
const Aircon = require('../models/aircon');
const Menu = require('../models/menu');
const Event = require('../models/event');

async function seed() {
    try {
        await connectDB();
        console.log('Connected to DB — seeding data...');

        // --- Admins ---
        const adminPassword = await bcrypt.hash('password123', 10);
        const adminData = {
            firstname: 'Test',
            lastname: 'Admin',
            birthdate: '1990-01-01',
            age: 35,
            email: 'admin@example.com',
            username: 'admin',
            password: adminPassword,
            address: '123 Test St',
            role: 'technician',
        };

        const admin = await Admin.findOneAndUpdate(
            { email: adminData.email },
            { $setOnInsert: adminData },
            { upsert: true, new: true }
        );
        console.log('Admin ready:', admin.email);

        // --- Aircons ---
        const aircon1 = await Aircon.findOneAndUpdate(
            { serialNumber: 'AC-TEST-001' },
            {
                $setOnInsert: {
                    brand: 'Daikin',
                    model: 'FTXJ25',
                    serialNumber: 'AC-TEST-001',
                    location: 'Building A - Room 101',
                    installationDate: new Date('2022-06-01'),
                    status: 'Active',
                },
            },
            { upsert: true, new: true }
        );

        const aircon2 = await Aircon.findOneAndUpdate(
            { serialNumber: 'AC-TEST-002' },
            {
                $setOnInsert: {
                    brand: 'Mitsubishi',
                    model: 'MSZ-GE22VA',
                    serialNumber: 'AC-TEST-002',
                    location: 'Building B - Lobby',
                    installationDate: new Date('2021-03-15'),
                    status: 'Under Maintenance',
                },
            },
            { upsert: true, new: true }
        );

        console.log('Aircons ready:', aircon1.serialNumber, aircon2.serialNumber);

        // --- Menus ---
        const menu1 = await Menu.findOneAndUpdate(
            { menuItem: 'Coffee' },
            { $setOnInsert: { menuItem: 'Coffee', price: 1.5, estimatedTime: '5m', imageLink: '' } },
            { upsert: true, new: true }
        );

        const menu2 = await Menu.findOneAndUpdate(
            { menuItem: 'Sandwich' },
            { $setOnInsert: { menuItem: 'Sandwich', price: 3.75, estimatedTime: '10m', imageLink: '' } },
            { upsert: true, new: true }
        );

        console.log('Menus ready:', menu1.menuItem, menu2.menuItem);

        // --- Events ---
        const start = new Date();
        const end = new Date(start.getTime() + 1000 * 60 * 60); // +1 hour

        const eventData = {
            aircon: aircon1._id,
            title: 'Routine Maintenance',
            description: ['Inspect filter', 'Check refrigerant levels'],
            start,
            end,
            technicians: [admin._id],
            status: 'Scheduled',
            notes: 'Bring replacement filters',
        };

        const event = await Event.findOneAndUpdate(
            { title: eventData.title, aircon: aircon1._id, start: eventData.start },
            { $setOnInsert: eventData },
            { upsert: true, new: true }
        );

        console.log('Event ready:', event.title);

        console.log('\nSeeding complete.');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        try {
            await require('mongoose').connection.close();
        } catch (e) { }
        process.exit(0);
    }
}

seed();

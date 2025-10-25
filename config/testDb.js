const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

async function testConnection() {
    try {
        // Test connection
        await connectDB();
        console.log('\n=== Database Connection Test ===');
        console.log('Connection Status:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        console.log('Port:', mongoose.connection.port);

        // List all collections
        console.log('\n=== Collections ===');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        // Test basic operations with a temporary document
        console.log('\n=== Testing Basic Operations ===');
        const TestModel = mongoose.model('TestConnection', new mongoose.Schema({
            test: String,
            timestamp: { type: Date, default: Date.now }
        }));

        // Create
        const testDoc = await TestModel.create({ test: 'Connection test' });
        console.log('Created test document:', testDoc._id);

        // Read
        const found = await TestModel.findById(testDoc._id);
        console.log('Retrieved test document:', found.test);

        // Clean up
        await TestModel.deleteOne({ _id: testDoc._id });
        console.log('Cleaned up test document');

        // Get server status
        const status = await mongoose.connection.db.admin().serverStatus();
        console.log('\n=== Server Status ===');
        console.log('MongoDB Version:', status.version);
        console.log('Uptime (seconds):', status.uptime);
        console.log('Active Connections:', status.connections.current);

        console.log('\n=== Test Completed Successfully ===');
    } catch (error) {
        console.error('\n❌ Test Failed:', error);
        process.exit(1);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Connection closed');
        process.exit(0);
    }
}

// Run the test
testConnection();
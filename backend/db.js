// backend/db.js
const mongoose = require('mongoose');

// THIS LINE MUST *NOT* BE HERE:
// require('dotenv').config();

const connectDB = async () => {
    try {
        // process.env.MONGO_URI will be available because it's loaded in server.js
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
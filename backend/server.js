// backend/server.js
require('dotenv').config({ debug: true }); // <--- ADD debug: true HERE

// TEMPORARY LOGS TO VERIFY ENV VARS
console.log('\n--- Environment Variables Check ---');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI (first 10 chars):', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 10) + '...' : 'undefined');
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
console.log('ADMIN_PASSWORD_BACKEND:', process.env.ADMIN_PASSWORD_BACKEND ? '******' : 'undefined');
console.log('--- End Env Vars Check ---\n');

const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Corrected path to './db' if db.js is directly in backend
const applicantRoutes = require('./routes/applicant');
const authRoutes = require('./routes/auth');

const app = express();
const PORT_APP = process.env.PORT || 5000; // Renamed to PORT_APP to avoid confusion with dotenv internal PORT debug

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Mount the application routes
app.use('/api/routes', applicantRoutes);

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('Welcome to the Internship App Backend!');
});

// Start the server
app.listen(PORT_APP, () => { // Use PORT_APP here
  console.log(`Server running on port ${PORT_APP}`);
});
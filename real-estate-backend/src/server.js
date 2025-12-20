const express = require('express');
const path = require('path'); 
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(express.json()); 

// Professional CORS setup: Allows all during testing, can be restricted later
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}

// Serve Static Files 
// 1. For Uploaded Images (root/uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 2. Serve frontend assets from the src folder
app.use(express.static(__dirname));

// --- Frontend Route ---
app.get('/tester', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Root Route - Redirects to tester or shows API status
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Real Estate API is Live",
        documentation: "/tester",
        owner: "Praveen Kumar & Pappu Kumar Yadav" // Updated from your team info
    });
});

// 404 Not Found Middleware
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        // Only show error stack in development mode for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Render dynamic PORT
const PORT = process.env.PORT || 5000;

// '0.0.0.0' is essential for Render deployment
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Test UI available at: http://localhost:${PORT}/tester`);
});
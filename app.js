// Import required modules
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Create Express application
const app = express();

// Middleware setup

// Use Morgan middleware for logging HTTP requests in development mode
app.use(morgan('dev'));

// Parse request bodies as JSON
app.use(express.json());



// Custom middleware function to log a message
app.use((req, res, next) => {
    console.log('Hello, this is a middleware');
    next();
});

// Custom middleware function to set the request time
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
}); 

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
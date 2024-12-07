const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const redisService = require('./services/redisService');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Connect to Redis
redisService.connect()
    .then(() => console.log('Redis connection established'))
    .catch(err => console.error('Redis connection error:', err));

// MongoDB connection
mongoose.connect(config.mongodb.url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/leaderboard', require('./controllers/leaderboardController'));
app.use('/auth', require('./controllers/authController'));

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await redisService.quit();
    await mongoose.connection.close();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; 
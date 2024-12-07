require('dotenv').config();

module.exports = {
    mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/leaderboard'
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key'
    }
}; 
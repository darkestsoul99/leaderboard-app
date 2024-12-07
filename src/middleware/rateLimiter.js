const redisService = require('../services/redisService');

const rateLimiter = async (req, res, next) => {
    try {
        const redis = await redisService.getClient();
        const ip = req.ip;
        const key = `ratelimit:${ip}`;

        const requests = await redis.incr(key);
        
        if (requests === 1) {
            await redis.expire(key, 60); // Reset after 60 seconds
        }

        if (requests > 100) { // 100 requests per minute limit
            return res.status(429).json({
                error: 'Too many requests',
                message: 'Please try again later'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = rateLimiter; 
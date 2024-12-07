const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const redisService = require('../services/redisService');

router.get('/health', async (req, res) => {
    try {
        const mongoStatus = mongoose.connection.readyState === 1;
        const redisStatus = (await redisService.getClient()).isOpen;

        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                mongodb: mongoStatus ? 'connected' : 'disconnected',
                redis: redisStatus ? 'connected' : 'disconnected'
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
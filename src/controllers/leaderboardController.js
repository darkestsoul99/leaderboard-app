const express = require('express');
const router = express.Router();
const leaderboardService = require('../services/leaderboardService');
const auth = require('../middleware/auth');

// Submit score
router.post('/submit-score', auth, async (req, res) => {
    try {
        const { userId, gameId, score } = req.body;
        const result = await leaderboardService.submitScore(userId, gameId, score);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get top players
router.get('/top', async (req, res) => {
    try {
        const { gameId, page = 1, limit = 10 } = req.query;
        const leaderboard = await leaderboardService.getTopPlayers(gameId, parseInt(page), parseInt(limit));
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get individual rank
router.get('/rank', async (req, res) => {
    try {
        const { userId, gameId } = req.query;
        const rank = await leaderboardService.getPlayerRank(userId, gameId);
        
        if (!rank) {
            return res.status(404).json({ error: 'Player not found on leaderboard' });
        }
        
        res.json(rank);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 
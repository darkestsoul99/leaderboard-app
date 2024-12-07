const Redis = require('redis');
const config = require('../config');

class LeaderboardService {
    constructor() {
        this.redis = Redis.createClient({
            url: config.redis.url
        });
        this.redis.connect();
    }

    async submitScore(userId, gameId, score) {
        const key = `game:${gameId}:leaderboard`;
        const currentScore = await this.redis.zScore(key, userId);

        // Only update if new score is higher
        if (!currentScore || score > currentScore) {
            await this.redis.zAdd(key, {
                score: score,
                value: userId
            });
        }

        // Get updated rank
        const rank = await this.redis.zRevRank(key, userId);
        return {
            userId,
            gameId,
            score: Math.max(currentScore || 0, score),
            rank: rank + 1
        };
    }

    async getTopPlayers(gameId, page = 1, limit = 10) {
        const key = `game:${gameId}:leaderboard`;
        const start = (page - 1) * limit;
        const stop = start + limit - 1;

        const results = await this.redis.zRevRangeWithScores(key, start, stop);
        
        return results.map((item, index) => ({
            rank: start + index + 1,
            userId: item.value,
            score: item.score
        }));
    }

    async getPlayerRank(userId, gameId) {
        const key = `game:${gameId}:leaderboard`;
        const [rank, score] = await Promise.all([
            this.redis.zRevRank(key, userId),
            this.redis.zScore(key, userId)
        ]);

        if (rank === null) {
            return null;
        }

        return {
            userId,
            rank: rank + 1,
            score
        };
    }
}

module.exports = new LeaderboardService();
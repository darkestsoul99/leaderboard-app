const Redis = require('redis');
const config = require('../config');

class RedisService {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) return;

        this.client = Redis.createClient({
            url: config.redis.url
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
            this.isConnected = false;
        });

        this.client.on('connect', () => {
            console.log('Redis Client Connected');
            this.isConnected = true;
        });

        await this.client.connect();
    }

    async getClient() {
        if (!this.isConnected) {
            await this.connect();
        }
        return this.client;
    }

    async quit() {
        if (this.client) {
            await this.client.quit();
            this.isConnected = false;
        }
    }
}

module.exports = new RedisService(); 
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Leaderboard API',
            version: '1.0.0',
            description: 'A simple leaderboard API'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/controllers/*.js']
};

module.exports = swaggerJsdoc(options);
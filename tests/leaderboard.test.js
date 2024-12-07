const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Leaderboard API', () => {
    let authToken;

    before(async () => {
        // Register and login a test user
        const res = await chai.request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        authToken = res.body.token;
    });

    describe('POST /leaderboard/submit-score', () => {
        it('should submit a score successfully', async () => {
            const res = await chai.request(app)
                .post('/leaderboard/submit-score')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    userId: 'testuser',
                    gameId: 'game1',
                    score: 100
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('score', 100);
        });
    });

    describe('GET /leaderboard/top', () => {
        it('should retrieve top players', async () => {
            const res = await chai.request(app)
                .get('/leaderboard/top')
                .query({
                    gameId: 'game1',
                    limit: 10,
                    page: 1
                });

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /leaderboard/rank', () => {
        it('should retrieve player rank', async () => {
            const res = await chai.request(app)
                .get('/leaderboard/rank')
                .query({
                    userId: 'testuser',
                    gameId: 'game1'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('rank');
        });
    });
}); 
const request = require('supertest');
const startServer = require('../src/app.js');

// eslint-disable-next-line no-undef
describe('Test status', () => {
    // eslint-disable-next-line no-undef
    test('it should get 200 status', async (done) => {
        const app = await startServer();
        const response = await request(app).get('/api/status');

        // eslint-disable-next-line no-undef
        expect(response.statusCode).toBe(200);
        done();
    });
});

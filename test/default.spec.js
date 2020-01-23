const request = require('supertest');
const startServer = require('../src/app.js');

describe('Test status', () => {
    test('it should get 200 status', async () => {
        let app = await startServer();
        const response = await request(app).get('/status');

        expect(response.statusCode).toBe(200)
    })
})

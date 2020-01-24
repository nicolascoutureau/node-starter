const request = require('supertest');
const User = require('../src/models/user');

describe('Test status', () => {
    test('it should get 200 status', async () => {
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200)
    })

    test('it should get 200 again', async () => {
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200)
    });

    test('it should create a new user', async () => {
        const user = new User({
            name: 'test user',
            email: 'nicolas.coutureau@gmail.test',
            password: 'passwrod',
        });
        await user.save();

        let users = await User.find();
        expect(users.length).toBe(1)
    });
});

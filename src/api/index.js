const { Router } = require('express');
const status = require('./routes/status');

module.exports = () => {
    const app = Router();

    status(app);

    return app;
};

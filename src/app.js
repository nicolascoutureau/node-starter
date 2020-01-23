const express = require('express');
const loaders = require('./loaders');

async function startServer() {
    const app = express();

    // eslint-disable-next-line global-require
    await loaders({expressApp: app});

    const port = process.env.port || 1337;

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

    return app;
}

module.exports = startServer;

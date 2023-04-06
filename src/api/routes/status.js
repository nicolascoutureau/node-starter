module.exports = (router) => {
    router.get('/status', (req, res) => res.json('ok'));

    router.get('/status/:id', (req, res) => {    
        res.json(`ok ${req.params.id}`);
    });

    router.post('currentTime', (req, res) => {
        res.json({ currentTime: new Date().toISOString() });
    })
};

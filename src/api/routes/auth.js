const {celebrate} = require('celebrate');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config');

module.exports = (router) => {
    router.post('/register',
        celebrate({
            body: Joi.object({
                name: Joi.string().min(5).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(5).required(),
            }),
        }),
        async (req, res) => {
            const hash = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });

            try {
                await user.save();

                res.status(201).json({message: 'Login successfully !'});
            } catch (error) {
                res.status(500).json({error});
            }
        });

    router.post('/login',
        celebrate({
            body: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(5).required(),
            }),
        }),
        async (req, res) => {
            const user = await User.findOne({email: req.body.email});

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User or password not found !',
                });
            }

            const valid = await bcrypt.compare(req.body.password, user.password);

            if (!valid) {
                return res.status(401).json({
                    success: false,
                    message: 'User or password not found !',
                });
            }

            // eslint-disable-next-line no-underscore-dangle
            const userId = user._id;
            const token = jwt.sign(
                {userId},
                config.jwtSecret,
                {expiresIn: '24h'},
            );

            return res.status(200).json({
                success: true,
                userId,
                token,
            });
        });
};

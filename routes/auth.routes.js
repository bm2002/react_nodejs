const { Router } = require('express');
const router = Router();
// const express = require('express');
const config = require('config')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const Profile = require('../models/profile')

router.get('/test', async (req, res) => {
    await res.send('test');
});

//api/auth/user/id
router.get('/user/:id', (req, res) => {

    User.
        findOne({ _id: req.params.id }).
        populate('profile').
        exec(function (err, user) {
            if (err) return handleError(err);
            res.send(user)
        });

});

router.post(
    '/registertest',
    async (req, res) => {
        //return res.status(201).json({ message: 'User created', status: true });
        return res.send(req.body.email);
    }
)

//api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Minimum lenght 6 symbols')
            .isLength({ min: 6 }),
        check('password', 'Only english letters or numbers')
            .matches(/^[A-Za-z0-9\s]+$/),
        check('password').custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Password confirmation is incorrect');
            } else {
                return true;
            }
        })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            const { email, password } = req.body;

            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid registration data',
                        status: false
                    });
            }

            const candidate = await User.findOne({ email });

            if (candidate) return res.status(400).json({ message: 'User already exists', status: false });

            const passwordHash = await bcrypt.hash(password, 12);

            const profile = new Profile(
                {
                    _id: new Types.ObjectId(),
                    awards: 151
                }
            )

            await profile.save();

            const user = new User({
                _id: new Types.ObjectId(),
                email,
                password,
                passwordHash,
                profile: profile._id
            });

            await user.save();

            return res.status(201).json({ message: 'User created', status: true });

            // await res.send(`email - ${email}, password - ${password}`);
        } catch (e) {
            res.status(500).json({ message: e.message, status: false });
        }
    });

//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('email', 'Empty email').exists(),
        check('password', 'Empty password').exists(),
        check('password', 'Only english letters or numbers')
            .matches(/^[A-Za-z0-9\s]+$/)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid login data',
                        status: false
                    });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            let IsMatch = false;
            if (user) {
                IsMatch = await bcrypt.compare(password, user.passwordHash);
            }

            if (!IsMatch) {
                return res.status(400).json({ message: 'Incorrect email or password', status: false, errors: errors.array() });
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('secret'),
                { 'expiresIn': '1h' }
            );

            return res.status(200).json({ token, userId: user._id, status: true, errors: errors.array() });

        } catch (e) {
            res.status(500).json({ message: e.message, status: false, errors: errors.array() });
        }
    });

//api/auth/user/id
router.get(
    '/user',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('email', 'Empty email').exists(),
        check('password', 'Empty password').exists(),
        check('password', 'Only english letters or numbers')
            .matches(/^[A-Za-z0-9\s]+$/)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid login data',
                        status: false
                    });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            let IsMatch = false;
            if (user) {
                IsMatch = await bcrypt.compare(password, user.passwordHash);
            }

            if (!IsMatch) {
                return res.status(400).json({ message: 'Incorrect email or password', status: false, errors: errors.array() });
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('secret'),
                { 'expiresIn': '1h' }
            );

            return res.status(200).json({ token, userId: user._id, status: true, errors: errors.array() });

        } catch (e) {
            res.status(500).json({ message: e.message, status: false, errors: errors.array() });
        }
    });


module.exports = router;

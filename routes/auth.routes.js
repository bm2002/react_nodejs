const { Router } = require('express');
const router = Router();
// const express = require('express');
const config = require('config')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

router.get('/test', async (req, res) => {
    await res.send('test');
});

//api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Minimum lenght 6 symbols')
            .isLength({ min: 6 }),
        check('password', 'Only english letters or numbers')
            .matches(/^[A-Za-z0-9\s]+$/)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            // res.send(errors);
            // res.send(req.body);

            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid registration data'
                    });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) return res.status(400).json({ message: 'User already exists' });

            const passwordHash = await bcrypt.hash(password, 12);

            const user = new User({
                email,
                password,
                passwordHash
            });

            await user.save();

            return res.status(201).json({ message: 'User created' });

            // await res.send(`email - ${email}, password - ${password}`);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Empty password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid registration data'
                    });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            let IsMatch = false;
            if (user){
                IsMatch = await bcrypt.compare(password, user.password);
            }

            if (!IsMatch) {
                return res.status(400).json({ message: 'User not found or incorrect password' });
            }

            const token = jwt.sign(
                {userId: user._id},
                config.get('secret'),
                {'expiresIn': '1h'}
            );

            return res.status(200).json({token, userId: user._id});

        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });


module.exports = router;

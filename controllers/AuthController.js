const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userSchema');

const signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {

            // checking is password less than 6                                             
            if (req.body.password.length > 5) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = new User({
                    email: req.body.email,
                    password: hashedPassword,
                });

                await newUser.save();
                res.status(200).send({ newUser, message: `User created successfully!`, success: true });
            }else {
                res.status(500).send({ message: `Password is less than 6 digit!`, success: false })
            }

        } else {
            res.status(500).send({ message: `Email already used!`, success: false })
        }

    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Failed to create user', success: false });
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if (isValidPassword) {
                const token = jwt.sign({ username: user.email, userId: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
                res.send({ accessToken: token, userId: user._id, message: 'Login Success', success: true });
            } else {
                res.status(401).send({ message: "Password wrong!", success: false })
            }
        } else {
            res.status(401).send({ message: "You are not registered user!", success: false })
        }

    } catch (error) {
        res.status(401).send({ error: error, message: 'Failed to Login', success: false });
    }
}

module.exports = { signup, login }
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../schema/userSchema');

const signup = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
            });

            await newUser.save();
            res.send({ newUser, message: `User created successfully!`, success: true });
        } catch (error) {
            res.status(500).send({ error: error, message: 'Failed to create user', success: false });
        }
    } else {
        res.send({ message: `Email already used!`, success: false })
    }
}

const login = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        isValidPassword = await bcrypt.compare(req.body.password, user.password);
        try {
            if (isValidPassword) {
                const token = jwt.sign({ username: user.email, userId: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
                res.send({ accessToken: token, userId: user._id, message: 'Login Success', success: true });
            } else {
                res.status(401).send({ message: "Password wrong!", success: false })
            }
        } catch (error) {
            res.status(401).send({ error: error, message: 'Failed to Login', success: false });
        }
    } else {
        res.status(401).send({ message: "You are not registred user!", success: false })
    }

}

module.exports = { signup, login }
const mongoose = require('mongoose');
const User = require('../models/userSchema');

const index = async (req, res) => {
    try {
        const users = await User.find();
        res.send({ users, message: 'Successfully loaded all users', success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Server side error', success: false });
    }
}

module.exports = { index }
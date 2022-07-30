const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const User = require('../models/userSchema');
const Profile = require('../models/profileSchema');

const index = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ users, message: 'Successfully loaded all users', success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Server side error', success: false });
    }
}

const update = async (req, res) => {
    try {
        const userId = req.params.userId;

        let updataData = {
            userId: userId,
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address,
        }

        if (req.file) {
            updataData = { ...updataData, img: req.file.path }
        } else {
            updataData = { ...updataData, img: req.body.img }
        }

        const updateUser = await Profile.findOneAndUpdate({ userId: userId }, {
            $set: updataData
        }, { new: true, upsert: true })
        res.status(200).send({ updateUser, message: `User updated successfully!`, success: true });

    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to update user', success: false });
    }
}

module.exports = { index, update }
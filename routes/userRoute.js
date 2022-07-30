const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const verifyLogin = require('../middleware/verifyLogin');
const UserController = require('../controllers/UserController');
const upload = require('../middleware/upload')

//get all users
router.get('/index', UserController.index);

//update user profile
router.put('/update/:userId', verifyLogin, upload.single('img'), UserController.update);


module.exports = router;
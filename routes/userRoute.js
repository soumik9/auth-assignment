const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const verifyLogin = require('../middleware/verifyLogin');
const UserController = require('../controllers/UserController');
// const upload = require('../middleware/upload')

//get all users
router.get('/user/index', UserController.index);


module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AuthController = require('../controllers/AuthController');


//login a user
router.post('/login', AuthController.login);
//create a new user
router.post('/signup', AuthController.signup);



/* //get all users
router.get('/user/index', UserController.index);
//get single users
router.get('/user/:userId', UserController.single);
router.get('/profile/:userId', UserController.profile);
//update a user
router.patch('/user/:userId', upload.single('img'), UserController.update);
//delete a user
router.delete('/user/:userId', UserController.destroy);
 */

module.exports = router;
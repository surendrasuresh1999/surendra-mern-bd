const express = require('express');
const { createNewUser, getAllUsers, loginUser, getUserInformation } = require('../Controllers/userController');
const requiredAuth = require("../Middleware/UserAuthentication")
const router = express.Router();

// get all users route
router.get('/all',getAllUsers)

// get userinformation route
router.get('/',requiredAuth, getUserInformation)

// signup route
router.post('/signup',createNewUser)

// login route
router.post('/login',loginUser)

module.exports = router;
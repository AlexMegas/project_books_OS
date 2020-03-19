const express = require('express');
const {
    signup,
    login,
    logout
} = require('../controllers/user.js');

const user = express.Router();

user.post('/signup', signup); // Register
user.post('/login', login); // Log In
user.get('/logout', logout); // Log Out

module.exports = user;
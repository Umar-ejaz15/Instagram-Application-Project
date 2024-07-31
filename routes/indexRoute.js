const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerAuth, loginAuth, logoutAuth } = require('../controllers/authcontroller.js');
const { generateToken } = require('../utils/generateToken.js');



router.get('/', (req, res) => {
    res.render('index');
});
router.get('/register', (req, res) => {
    res.render('register.ejs');
});
router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/register', registerAuth);
router.post('/login', loginAuth )
router.get('/logout', logoutAuth)

module.exports = router;
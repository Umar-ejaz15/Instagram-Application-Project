const express = require('express');
const router = express.Router();
// const userModel = require('../models/user');
const loggedIn = require('../middlewares/loggedin');
router.get('/', loggedIn, (req, res) => {
    let user = req.user;
    res.render('profile', { user });
    console.log(user);
});


module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { generateToken } = require('../utils/generateToken');
const user = require('../models/user');


module.exports.registerAuth = async (req, res) => {
    let { fullname, email, username, password } = req.body;
    try {
        let findUser = await userModel.findOne({ email });
        if (findUser) {
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let createdUser = await userModel.create({
            email,
            fullname,
            username,
            password: hash
        });
        let token = generateToken(createdUser)
        res.cookie('token', token)

        res.redirect('/home');



    } catch (error) {
        console.error(error);
        res.status(500).send('Error during registration');
    }
}
module.exports.loginAuth = async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).send('User does not exist');
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user)
            res.cookie('token', token)
            res.redirect('/home')
        } else {
            res.redirect('/login')
        }
    })
}
module.exports.logoutAuth = (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
}
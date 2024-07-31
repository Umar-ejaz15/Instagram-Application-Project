const express = require('express');
const router = express.Router();
const loggedIn = require('../middlewares/loggedin');
const upload = require("../config/muler");
const postModel = require("../models/post");
const userModel = require('../models/user');

// GET profile page
router.get('/', loggedIn,  (req, res) => {
    res.render("post")
});

// POST create post
router.post("/", loggedIn, upload.single('image'), async (req, res) => {
    try {
        const { text } = req.body;
 
        const newPost = await postModel.create({
            text,
            image: req.file ? req.file.buffer : undefined,
            
        })
        res.redirect('/profile',{newPost});
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while creating the post');
    }
});

module.exports = router;

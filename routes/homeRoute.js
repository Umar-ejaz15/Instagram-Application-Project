const express = require('express');
const router = express.Router();
const loggedIn = require('../middlewares/loggedin');
const Post = require('../models/post'); // Assuming you have a Post model

router.get('/', loggedIn, async (req, res) => {
    try {
        let posts = await Post.find({});
        res.render('home', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).render('error', { message: 'Error fetching posts' });
    }
});

module.exports = router;
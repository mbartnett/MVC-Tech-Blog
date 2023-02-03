const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then((posts) => {
        console.log(posts);
        res.render('home', { posts });
    });
});

module.exports = router;


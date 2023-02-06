const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        console.log(posts);
        posts = posts.map((post) => post.get({ plain: true }));
        res.render('home', { posts });
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        posts = posts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts });
    });
});

module.exports = router;


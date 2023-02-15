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

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        res.render('edit-post', { post });
    });
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

router.get('/comment/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        console.log(post)
        res.render('comment', { post });
    });
});

module.exports = router;


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
        res.render('home', { posts, loggedIn: req.session.loggedIn });
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
        res.render('edit-post', { post, loggedIn: req.session.loggedIn  });
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
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn  });
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
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ]
                    
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        // console.log(post)
        res.render('comment', { post, loggedIn: req.session.loggedIn  });
    });
});

router.get('/edit-comment/:id', withAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
        ]
    }).then((comment) => {
        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        comment = comment.get({ plain: true });
        // console.log(comment)
        res.render('edit-comment', { comment, loggedIn: req.session.loggedIn  });
    });
});

module.exports = router;


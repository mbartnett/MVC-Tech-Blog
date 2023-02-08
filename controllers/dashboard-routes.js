const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User
            }
        ],
        where: {
            user_id: req.session.user_id
        }
    }).then((posts) => {
        posts = posts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts });
    });
});



module.exports = router;

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const postData = require('./postData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    
const posts = await Post.findAll(); 

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
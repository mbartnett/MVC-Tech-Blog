
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Post");

User.hasMany(Post);
Post.belongsTo(User);
Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

module.exports = {
    User,
    Post,
    Comment
}
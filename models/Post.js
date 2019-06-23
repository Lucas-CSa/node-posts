const db = require('./db');

const Post = db.sequelize.define('postagens', {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

//Post.sync({force:true});

module.exports = Post;
const createBlogPost= (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type:DataTypes.STRING,
        references: {
            model: 'user',
            key: 'id'
        }
      }, 
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, { 
        tableName: 'BlogPosts'
    });

    BlogPost.associate = (db) => {
        BlogPost.belongsTo(db.User, { as: 'Users', foreignKey: 'userId' })
    }
  
    return BlogPost;
  };

module.exports = createBlogPost;



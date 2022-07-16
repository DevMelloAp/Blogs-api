const createBlogPost= (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type:DataTypes.STRING,
        references: {
            model: 'User',
            key: 'id'
        }
      }, 
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, { 
        timestamps: false,
        tableName: 'BlogPosts'
    });

    BlogPost.associate = (db) => {
        BlogPost.belongsTo(db.User, { as: 'user', foreignKey: 'userId' })
    }
  
    return BlogPost;
  };

module.exports = createBlogPost;



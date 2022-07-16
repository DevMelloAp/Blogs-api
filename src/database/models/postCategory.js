const createPostCategory= (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: { type: DataTypes.INTEGER, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    }, { 
        timestamps: false,
        tableName: 'PostCategories' 
    });

     PostCategory.associate = (db) => {
        db.BlogPost.belongsToMany(db.Category, { 
            as: 'categories', 
            foreignKey: 'postId',
            otherKey: 'categoryId',
            through: db.PostCategory
        });
        db.Category.belongsToMany(db.BlogPost, { 
            as: 'BlogPosts', 
            foreignKey: 'categoryId',
            otherKey: 'postId',
            through: db.PostCategory
        });
      };
         
    return PostCategory;
  };

module.exports = createPostCategory;
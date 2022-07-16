const { login } = require('./controllers/authController');
const { create, list, getById } = require('./controllers/userController');

const { createCategory, listCategories } = require('./controllers/categoryController');

const { createPost, listPosts, getPostById } = require('./controllers/postController');

module.exports = {
    login,
    create,
    list,
    getById,
    createCategory,
    listCategories,   
    createPost,
    listPosts,
    getPostById,
  };
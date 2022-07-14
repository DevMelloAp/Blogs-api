const { login } = require('./controllers/authController');
const { create, list, getById } = require('./controllers/userController');

const { createCategory, listCategories } = require('./controllers/categoryController');

module.exports = {
    login,
    create,
    list,
    getById,
    createCategory,
    listCategories,
  };
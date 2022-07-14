const { login } = require('./controllers/authController');
const { create, list, getById } = require('./controllers/userController');

module.exports = {
    login,
    create,
    list,
    getById,
  };
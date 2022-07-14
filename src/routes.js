const { login } = require('./controllers/authController');
const { create, list } = require('./controllers/userController');

module.exports = {
    login,
    create,
    list,
  };
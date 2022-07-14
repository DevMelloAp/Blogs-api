const Joi = require('joi');
const { User } = require('../database/models');

const userService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },
  create: async ({ displayName, email, password, image }) => {
    const user = await User.create({ displayName, email, password, image });
   
    return user;
  },
  list: async () => {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] },
   });
    return users;
  },   
};

module.exports = userService;
const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

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
    const usersList = await userService.list();
        const emailList = usersList.map((it) => it.email);

        if (emailList.includes(email)) {
            const e = new Error('User already registered');
            e.name = 'ConflictError';
            throw e;
        }

    const user = await User.create({ displayName, email, password, image });
   
    return user;
  },
  list: async () => {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] },
   });
    return users;
  },   
  getById: async (id) => {
    const user = await User.findByPk(id, { 
      attributes: { exclude: ['password'] },
    });  

    if (!user) {
        const e = new Error('User does not exist');
        e.name = 'NotFoundError';
        throw e;
    }

    return user;
  },
  removeUserMe: async (authorization) => {
    const users = await userService.list();

    const user = users.find((it) => jwtService.createToken(it.email) === authorization);

    const removed = await User.destroy({ where: { id: user.id } });
    return removed;
  },
};

module.exports = userService;

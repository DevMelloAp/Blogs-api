const Joi = require('joi');
const { Category } = require('../database/models');

const userService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },
  createCategory: async ({ name }) => {
    const category = await Category.create({ name });
   
    return category;
  },
  listCategories: async () => {
    const categories = await Category.findAll();

    return categories;
  },  
};

module.exports = userService;
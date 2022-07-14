require('dotenv').config();
const categoryService = require('../services/categoryService');

 const userController = {
    createCategory: async (req, res) => {
        const { name } = categoryService.validateBody(req.body);

        const category = await categoryService.createCategory({ name });

        res.status(201).json(category);
    },
};

module.exports = userController;
require('dotenv').config();
const categoryService = require('../services/categoryService');

 const userController = {
    createCategory: async (req, res) => {
        const { name } = categoryService.validateBody(req.body);

        const category = await categoryService.createCategory({ name });

        res.status(201).json(category);
    },
    listCategories: async (_req, res) => {
        const categories = await categoryService.listCategories();
            
        res.status(200).json(categories);
    },
};

module.exports = userController;
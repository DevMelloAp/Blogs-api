require('dotenv').config();
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

 const userController = {
    create: async (req, res) => {
        const { displayName, email, password, image } = userService.validateBody(req.body);

        await userService.create({ displayName, email, password, image });

        const token = jwtService.createToken(email);

        res.status(201).json({ token });
    },
    list: async (_req, res) => {
        const users = await userService.list();
            
        res.status(200).json(users);
      },
    getById: async (req, res) => {
        const user = await userService.getById(req.params.id);

        res.status(200).json(user);
    },    
};

module.exports = userController;
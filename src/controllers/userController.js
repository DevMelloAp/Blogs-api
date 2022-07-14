require('dotenv').config();
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

 const userController = {
    create: async (req, res) => {
        const { displayName, email, password, image } = userService.validateBody(req.body);

        const users = await userService.list();
        const emailList = users.map((it) => it.email);

        if (emailList.includes(email)) {
            const e = new Error('User already registered');
            e.name = 'ConflictError';
            throw e;
        }
        
        const user = await userService.create({ displayName, email, password, image });

        if (!user) throw Error;

        const token = jwtService.createToken(email);

        res.status(201).json({ token });
    },
    list: async (_req, res) => {
        const users = await userService.list();
            
        res.status(200).json(users);
      },    
};

module.exports = userController;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

 const userController = async (req, res) => {
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

    const token = jwt.sign(email, JWT_SECRET);

    res.status(201).json({ token });
};

module.exports = userController;
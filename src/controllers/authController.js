const jwtService = require('../services/jwtService');
const authService = require('../services/authService');

 const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;  

        if (!email || !password) {
            return res.status(400)  
            .json({ message: 'Some required fields are missing' }); 
        }

        const token = await authService.login(email, password);

        return res.status(200).json({ token });
    },
    validateToken: (req, _res, next) => {
        const { authorization } = req.headers;

        jwtService.validateToken(authorization);

        next();
    },  
};

module.exports = authController;
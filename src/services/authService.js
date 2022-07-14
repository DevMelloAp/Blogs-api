const jwtService = require('./jwtService');

const { User } = require('../database/models');

const authService = {
    login: async (email, password) => {
       const user = await User.findOne({ where: { email } });
   
       if (!user || user.password !== password) { 
        const e = new Error('Invalid fields');
        e.name = 'ValidationError';
        throw e; 
      }
   
       const token = jwtService.createToken(email);
   
       return token;
    },
    validateToken: (token) => {
        const data = jwtService.validateToken(token);

        return data;
    },    
};

module.exports = authService;
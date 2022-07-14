const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtService = {
    createToken: (data) => {
        const token = jwt.sign(data, JWT_SECRET);
        return token;
    },
    validateToken: (token) => {
        if (!token) { 
            const error = new Error('Token not found');
            error.name = 'UnauthorizedError';
            throw error; 
          }
        try {
            const data = jwt.verify(token, JWT_SECRET);
            return data;
        } catch (e) {
            const error = new Error('Expired or invalid token');
            error.name = 'UnauthorizedError';
            throw error;
        }
    },
};

module.exports = jwtService;
const express = require('express');
const rescue = require('express-rescue');
const routes = require('./routes');

const authController = require('./controllers/authController');

const app = express();

app.use(express.json());

const apiRoutes = express.Router();

apiRoutes.post('/login', rescue(routes.login));
apiRoutes.post('/user', rescue(routes.create));
apiRoutes.get('/user/:id', authController.validateToken, rescue(routes.getById));
apiRoutes.delete('/user/me', authController.validateToken, rescue(routes.removeUserMe));
apiRoutes.get('/user', authController.validateToken, rescue(routes.list));
apiRoutes.post('/categories', authController.validateToken, rescue(routes.createCategory));
apiRoutes.get('/categories', authController.validateToken, rescue(routes.listCategories));
apiRoutes.post('/post', authController.validateToken, rescue(routes.createPost));
apiRoutes.get('/post/search', authController.validateToken, rescue(routes.getPostSearch));
apiRoutes.get('/post/:id', authController.validateToken, rescue(routes.getPostById));
apiRoutes.put('/post/:id', authController.validateToken, rescue(routes.updatePost));
apiRoutes.delete('/post/:id', authController.validateToken, rescue(routes.removePost));
apiRoutes.get('/post', authController.validateToken, rescue(routes.listPosts));

app.use(apiRoutes);

app.use((err, _req, res, _next) => {
    const { name, message } = err;
    switch (name) {
      case 'ValidationError':
        res.status(400).json({ message });
        break;
      case 'NotFoundError':
        res.status(404).json({ message });
        break;
      case 'ConflictError':
        res.status(409).json({ message });
        break;
      case 'UnauthorizedError':
        res.status(401).json({ message });
        break;
      default:
        res.status(500).json({ message });
        break;
    }
  });
  
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

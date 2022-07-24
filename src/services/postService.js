const Joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../database/models');
const jwtService = require('./jwtService');

const postService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  },
  createPost: async ({ title, content, categoryIds, published, updated, id }) => {
    const categorieExist = await Category.findAll({ where: { id: categoryIds } });
    
    if (categorieExist.length === 0) {
      const e = new Error('"categoryIds" not found');
            e.name = 'ValidationError';
            throw e;
    }
    
    const post = await BlogPost
    .create({ title, 
      content, 
      categoryIds, 
      userId: id,
      published, 
      updated,
    });
    
    return post;
  },
  listPosts: async () => {
    const posts = await BlogPost.findAll({
      include: [{
        model: User, 
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });

    return posts;
  },  
  getPostById: async (id) => {
    const post = await BlogPost.findByPk(id, { 
      include: [{ model: User, 
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      }, { model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
      attributes: { exclude: ['password'] },
    });  

    if (!post) { 
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }

    return post;
  },
  updatePost: async (id, title, content, authorization) => {
    const idPost = await postService.getPostById(id);

    const [emailP] = [idPost].map((it) => it.user.email);

    const tokenEmailPost = jwtService.createToken(emailP);

    if (authorization !== tokenEmailPost) { 
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }

    await BlogPost.update({ title, content,
    },
      { where: { id } });

    const updatedPost = await postService.getPostById(id);

    return updatedPost;
  },
  removePost: async (id, authorization) => {
    const idPost = await postService.getPostById(id);

    if (!idPost) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }

    const [emailOfPost] = [idPost].map((it) => it.user.email);

    const tokenEmailPost = jwtService.createToken(emailOfPost);

    if (authorization !== tokenEmailPost) { 
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }
    
    const removedPost = await BlogPost.destroy({ where: { id: idPost.id } });
  
    return removedPost;
    },
    getPostSearch: async (q) => { 
      if (!q) {
        const listPost = await BlogPost.findAll({
          include: [{ model: User, as: 'user', attributes: { exclude: ['password'] },
        }, { model: Category, as: 'categories', through: { attributes: [] } }],
        attributes: { exclude: ['password'] },
        });
        return listPost;
      }

      const quest = `%${q}%`;

      const searchPost = await BlogPost.findAll({ where: { 
        [Op.or]: [{ title: { [Op.like]: quest } }, { content: { [Op.like]: quest } }] },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] },
        }, { model: Category, as: 'categories', through: { attributes: [] },
        }],
        attributes: { exclude: ['password'] },
      });

      if (!searchPost) return [];

      return searchPost;
    },
};

module.exports = postService;
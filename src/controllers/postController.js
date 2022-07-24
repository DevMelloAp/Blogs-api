const jwt = require('jsonwebtoken');
const postService = require('../services/postService');
const postCategoryService = require('../services/postCategoryService');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

 const postController = {
    createPost: async (req, res) => {
        const { title, content, categoryIds } = (req.body);
        const { authorization } = req.headers;

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const published = today.toUTCString();

        const updated = today.toUTCString();

        const emailOftoken = jwt.verify(authorization, JWT_SECRET);

        const { id } = await User.findOne({ where: { email: emailOftoken } });

        if (!title || !content) {
            return res.status(400)  
            .json({ message: 'Some required fields are missing' }); 
        }

        const post = await postService
        .createPost({ title, content, categoryIds, published, updated, id });

        await postCategoryService.createPostCategory({ postId: post.id, categoryId: categoryIds });

        res.status(201).json(post);
    },
    listPosts: async (_req, res) => {
        const posts = await postService.listPosts();
            
        res.status(200).json(posts);
    },
    getPostById: async (req, res) => {
        const post = await postService.getPostById(req.params.id);

        res.status(200).json(post);
    },
    updatePost: async (req, res) => {
        const { title, content } = req.body;  
        const { authorization } = req.headers;

        if (!title || !content) {
            return res.status(400)  
            .json({ message: 'Some required fields are missing' }); 
        }
        
        await postService.validateBody(req.body);
        
        const post = await postService.updatePost(req.params.id, title, content, authorization);

        res.status(200).json(post);
    }, 
    removePost: async (req, res) => {
        await postService.removePost(req.params.id, req.headers.authorization);

        res.sendStatus(204);
    },
    getPostSearch: async (req, res) => {
        const post = await postService.getPostSearch(req.query.q);

        res.status(200).json(post);
    },
};

module.exports = postController;

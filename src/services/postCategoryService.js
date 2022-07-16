const { PostCategory } = require('../database/models');

const postCategoryService = {
  createPostCategory: async ({ postId, categoryId }) => {
    const postCategory = await categoryId.forEach((it) => PostCategory
    .create({
        postId,
        categoryId: it,
    }));
    
    return postCategory;
  },
};

module.exports = postCategoryService;
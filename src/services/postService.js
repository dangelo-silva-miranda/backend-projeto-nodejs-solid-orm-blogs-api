const { StatusCodes } = require('http-status-codes');
const { BlogPost, PostsCategory } = require('../models');
// const { blogPostDataSchema } = require('./schemas');

const createPost = async ({ title, content, userId, categoryIds }) => {
  // const result = await BlogPost.create({ 
  //   title, content, user: { id: userId }, categories: [categoryIds], 
  // });

  // const result = await BlogPost.create({ 
  //   title, content, userId, 
  // });
  
    // const result = await BlogPost.create({
    //   title,
    //   content,
    //   userId, 
    //   categories: categoryIds },
    //   {
    //     include: {
    //       model: PostsCategories,
    //       // through: 'PostsCategory',
    //       as: 'categories',
    //       attributes: ['categoryId'],
    //     },
    //   });

    const { dataValues } = await BlogPost.create({ title, content, userId });
    const post = dataValues;
    delete post.updated;
    delete post.published;

    const { id: postId } = post;
    
    categoryIds.forEach(async (categoryId) => {
      await PostsCategory.create({ postId, categoryId });      
    });

  return { code: StatusCodes.CREATED, post };
};

module.exports = {
  createPost,
};
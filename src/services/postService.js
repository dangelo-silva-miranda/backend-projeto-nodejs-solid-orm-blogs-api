const { StatusCodes } = require('http-status-codes');
const { BlogPost } = require('../models');
// const { blogPostDataSchema } = require('./schemas');

const createPost = async ({ title, content, userId, categoryIds }) => {
  const { dataValues: post } = await BlogPost.create({ title, content, userId, categoryIds });

  return { code: StatusCodes.CREATED, post };
};

module.exports = {
  createPost,
};
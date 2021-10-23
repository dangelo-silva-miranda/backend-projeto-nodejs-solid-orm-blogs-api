const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { user: { id: userId }, body: { title, content, categoryIds } } = req;
  const { code, message, post } = await postService.createPost(
    { title, content, userId, categoryIds },
  );

  if (!post) {
    return res.status(code).json({ message });  
  }
  
  return res.status(code).json(post);
};

const findAllPosts = async (_req, res) => {
  const { code, posts } = await postService.findAllPosts();

  return res.status(code).json(posts);
};

module.exports = {
  createPost,
  findAllPosts,
};
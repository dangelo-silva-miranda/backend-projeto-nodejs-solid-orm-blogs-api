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

module.exports = {
  createPost,
};
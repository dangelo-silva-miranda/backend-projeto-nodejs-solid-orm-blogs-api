const express = require('express');
const postController = require('../controllers/postController');
const { validateAuth } = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.post('/', [validateAuth], postController.createPost);

module.exports = {
  postRouter,
};
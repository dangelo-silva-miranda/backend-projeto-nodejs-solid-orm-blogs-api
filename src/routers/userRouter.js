const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);

userRouter.get('/', userController.findAllUsers);

module.exports = {
  userRouter,
};
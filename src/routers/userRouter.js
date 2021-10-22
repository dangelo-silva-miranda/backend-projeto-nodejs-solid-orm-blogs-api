const express = require('express');
const userController = require('../controllers/userController');
const { validateAuth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);

userRouter.get('/', [validateAuth], userController.findAllUsers);

userRouter.get('/:id', [validateAuth], userController.findUserByPk);

module.exports = {
  userRouter,
};
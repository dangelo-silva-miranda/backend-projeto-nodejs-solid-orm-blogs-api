const express = require('express');
const userController = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post('/', userController.loginUser);

module.exports = {
  loginRouter,
};
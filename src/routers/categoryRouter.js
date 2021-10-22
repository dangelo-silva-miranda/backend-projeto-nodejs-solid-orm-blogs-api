const express = require('express');
const categoryController = require('../controllers/categoryController');
const { validateAuth } = require('../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.post('/', [validateAuth], categoryController.createCategory);

categoryRouter.get('/', [validateAuth], categoryController.findAllCategories);

module.exports = {
  categoryRouter,
};
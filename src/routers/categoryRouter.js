const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.createCategory);

categoryRouter.get('/', categoryController.findAllCategories);

module.exports = {
  categoryRouter,
};
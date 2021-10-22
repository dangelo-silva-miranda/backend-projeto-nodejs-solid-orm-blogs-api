const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.createCategory);

module.exports = {
  categoryRouter,
};
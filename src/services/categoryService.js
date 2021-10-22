const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');
const { categoryDataSchema } = require('./schemas');

const createCategory = async ({ name }) => {
  const { dataValues: category } = await Category.create({ name });

  return { code: StatusCodes.CREATED, category };
};

module.exports = {
  createCategory,
};
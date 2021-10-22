const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');
const { categoryDataSchema } = require('./schemas');

const createCategory = async ({ name }) => {
  const { error } = categoryDataSchema.validate({ name });
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];    
    return { code: StatusCodes.BAD_REQUEST, message };
  }
  
  const { dataValues: category } = await Category.create({ name });

  return { code: StatusCodes.CREATED, category };
};

module.exports = {
  createCategory,
};
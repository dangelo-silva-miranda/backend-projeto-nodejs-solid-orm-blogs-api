const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const createUser = async ({ displayName, email, password, image = '' }) => {
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
    
  const token = '';
  return { code: StatusCodes.CREATED, token };
};

module.exports = {
  createUser,
};
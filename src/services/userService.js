const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createToken = ({ id, email }) => {
  /* expiresIn aceita o tempo de forma bem descritiva: '7d' = 7 dias, '8h' = 8 horas. */
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  /* Assina a mensagem (data), isto é, gera o token utilizando a chave secreta */
  const token = jwt.sign({ data: { id, email } }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const createUser = async ({ displayName, email, password, image = '' }) => {
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
    
  const token = createToken({ id, email });
  return { code: StatusCodes.CREATED, token };
};

module.exports = {
  createUser,
};
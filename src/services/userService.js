const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { userDataSchema } = require('./schemas');

const userEmailExists = async (email) => {
  // Verifica se o e-mail já existe no DB
  const emailDB = await User.findOne({ attributes: ['email'], where: { email } });
  
  return emailDB !== null;
};

const findUserId = async ({ email, password }) => {
  // Verifica no DB se o e-mail existe e se o password está correto
  const result = await User.findOne(
    { attributes: ['id'], where: { email, password } },
  );
  
  if (result) { return result.dataValues.id; }
  
  return null;
};

const createToken = ({ id, email }) => {
  /* expiresIn aceita o tempo de forma bem descritiva: '7d' = 7 dias, '8h' = 8 horas. */
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  /* Assina a mensagem (data), isto é, gera o token utilizando a chave secreta */
  const token = jwt.sign({ data: { id, email } }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const createUser = async ({ displayName, email, password, image = '' }) => {
  const { error } = userDataSchema.validate({ displayName, email, password, image });
  if (error) { // error.isJoi indentifica se o erro foi do tipo Joi
    const { message } = error.details[0];    
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const emailExists = await userEmailExists(email);
  if (emailExists) {
    return { code: StatusCodes.CONFLICT, message: 'User already registered' };
  }

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
    
  const token = createToken({ id, email });
  return { code: StatusCodes.CREATED, token };
};

const loginUser = async ({ email, password }) => {
  const { error } = userDataSchema.validate({ email, password });
  if (error) { // error.isJoi indentifica se o erro foi tipo Joi
    const { message } = error.details[0];    
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const id = await findUserId({ email, password });
  if (!id) {
    return { code: StatusCodes.BAD_REQUEST, message: 'Invalid fields' };
  }

  const token = createToken({ id, email });
  return { code: StatusCodes.OK, token };
};

/*
  Material consultado sobre como remover alguns atributos
  https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries
*/
const findAllUsers = async () => {
  const users = await User.findAll({
      attributes: { exclude: ['password'] },
  });

  return { code: StatusCodes.OK, users };
};

/*
  Material consultado sobre options de findByPk
  https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findByPk
*/
const findUserByPk = async ({ id }) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  return { code: StatusCodes.OK, user };
};

module.exports = {
  createUser,
  loginUser,
  findAllUsers,
  findUserByPk,
};
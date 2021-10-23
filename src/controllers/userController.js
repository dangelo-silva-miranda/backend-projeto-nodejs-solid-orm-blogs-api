const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { code, message, token } = await userService.createUser(req.body);

  if (!token) {
    return res.status(code).json({ message });  
  }
  
  return res.status(code).json({ token });
};

const loginUser = async (req, res) => {
  const { code, message, token } = await userService.loginUser(req.body);

  if (!token) {
    return res.status(code).json({ message });  
  }
  
  return res.status(code).json({ token });
};

const findAllUsers = async (_req, res) => {
  const { code, users } = await userService.findAllUsers();

  return res.status(code).json(users);
};

const findUserByPk = async (req, res) => {
  const { code, message, user } = await userService.findUserByPk(req.params);

  if (!user) {
    return res.status(code).json({ message });  
  }

  return res.status(code).json(user);
};

module.exports = {
  createUser,
  loginUser,
  findAllUsers,
  findUserByPk,
};
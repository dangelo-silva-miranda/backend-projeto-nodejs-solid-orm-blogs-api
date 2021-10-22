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

const findAllUsers = async (req, res) => {
  const { code, users } = await userService.findAllUsers(req.body);

  return res.status(code).json(users);
};

module.exports = {
  createUser,
  loginUser,
  findAllUsers,
};
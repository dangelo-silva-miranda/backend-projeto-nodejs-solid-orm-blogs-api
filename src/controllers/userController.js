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

module.exports = {
  createUser,
  loginUser,
};
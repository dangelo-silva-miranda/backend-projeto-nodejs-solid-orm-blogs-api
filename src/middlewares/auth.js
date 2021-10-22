const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const validateAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token not found',
    });
  }

  try {
    /* 
      Usa o método verify e a chave secreta para validar e decodificar o JWT.
    */
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;

    next();
  } catch (error) {
    // Mensagem informando que o token é inválido (expirou ou adulterado)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  validateAuth,
};
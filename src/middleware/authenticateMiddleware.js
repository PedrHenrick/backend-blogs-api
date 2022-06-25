const { authenticateToken } = require('../utils/JWTToken');

const errorObjectEmptyToken = { status: 401, message: 'Token not found' };

const authenticateMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw errorObjectEmptyToken;
  
  const user = await authenticateToken(token);
  next();
};

module.exports = authenticateMiddleware;

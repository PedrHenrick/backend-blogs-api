const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'bananinhaDePijaminha';
const errorObjectInvalidToken = { status: 401, message: 'Expired or invalid token' };

const jwtConfig = {
  // expiresIn: '15m', //Dando um erro estranho
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  try {
    const introspection = await jwt.verify(token, SECRET, jwtConfig);
    return introspection;
  } catch (_e) {
    throw errorObjectInvalidToken;
  }
};

module.exports = { generateJWTToken, authenticateToken };

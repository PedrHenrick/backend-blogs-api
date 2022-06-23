const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "bananinhaDePijaminha";

const jwtConfig = {
  // expiresIn: '15m', //Dando um erro estranho
  algorithm: 'HS256',
}

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) throw { status: 401, message: "Sem Token" };

  try{
    const introspection = await jwt.verify(token, SECRET, jwtConfig);
    return introspection;
  } catch (e) {
    throw { status: 401, message: "token inválido" };
  }
}

module.exports = { generateJWTToken, authenticateToken }

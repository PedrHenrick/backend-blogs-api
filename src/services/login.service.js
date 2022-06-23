const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/JWTToken');

const authentication = async ({ email, password }) => {
  const hasUser = await User.findOne({
    attributes: ['id', ['displayName', 'name'], 'email'],
    where: { email, password }
  });

  if (!hasUser) throw { status: 400, message: 'Invalid fields' };

  const token = generateJWTToken(JSON.stringify(hasUser));
  return { token };
}

module.exports = { authentication }

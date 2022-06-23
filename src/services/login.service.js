const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/JWTToken');

const errorObjectInvalidFields = { status: 400, message: 'Invalid fields' };

const authentication = async ({ email, password }) => {
  const hasUser = await User.findOne({
    attributes: [['displayName', 'name'], 'email'],
    where: { email, password },
  });

  if (!hasUser) throw errorObjectInvalidFields;

  const token = generateJWTToken(JSON.stringify(hasUser));
  return { token };
};

module.exports = { authentication };

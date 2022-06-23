const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/JWTToken');

const errorObjectForEmail = { status: 409, message: 'User already registered' };

const add = async (userInformations) => {
  try {
    const hasUserAdded = await User.create(userInformations);

    const information = {
      name: hasUserAdded.dataValues.displayName,
      email: hasUserAdded.dataValues.email,
    };

    const token = generateJWTToken(JSON.stringify(information));
    return { token };
  } catch (_e) {
    throw errorObjectForEmail;
  }
};

module.exports = { add };

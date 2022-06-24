const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/JWTToken');

const errorObjectForEmail = { status: 409, message: 'User already registered' };
const errorObjectUserId = { status: 404, message: 'User does not exist' };

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async ({ id }) => {
  const hasUser = await User.findOne({ attributes: { exclude: ['password'] }, where: { id } });
  if (!hasUser) throw errorObjectUserId;
  return hasUser;
};

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

module.exports = { getAll, getById, add };

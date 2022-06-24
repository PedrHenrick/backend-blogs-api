const userService = require('../services/user.service');

const getAll = async (_req, res) => {
  const user = await userService.getAll();
  res.status(200).json(user);
};

const getById = async (req, res) => {
  const userWithId = await userService.getById(req.params);
  res.status(200).json(userWithId);
};

const add = async (req, res) => {
  const user = await userService.add(req.body);
  res.status(201).json(user);
};

module.exports = { getAll, getById, add };

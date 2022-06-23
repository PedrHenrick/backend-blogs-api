const userService = require('../services/user.service');

const getAll = async (_req, res) => {
  const user = await userService.getAll();
  res.status(200).json(user);
};

const add = async (req, res) => {
  const user = await userService.add(req.body);
  res.status(201).json(user);
};

module.exports = { add, getAll };

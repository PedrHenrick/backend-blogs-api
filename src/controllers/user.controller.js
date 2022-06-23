const userService = require('../services/user.service');

const add = async (req, res) => {
  const user = await userService.add(req.body);
  res.status(201).json(user);
};

module.exports = {
  add,
};

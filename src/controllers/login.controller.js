const loginService = require('../services/login.service');

const authenticate = async (req, res) => {
  const token = await loginService.authentication(req.body);
  res.status(200).json(token)
};

module.exports = {
  authenticate,
}

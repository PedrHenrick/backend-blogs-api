const express = require('express');
const loginController = require('../controllers/login.controller.js');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaLogin } = require('../middleware/schemas');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  validateSchema(schemaLogin),
  loginController.authenticate,
);

module.exports = loginRouter;

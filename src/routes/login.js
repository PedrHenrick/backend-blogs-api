const express = require('express');
const loginController = require('../controllers/login.controller.js');
const validateSchemaAuthentication = require('../middleware/middlewareAuthentication.js');
const { schemaLogin } = require('../middleware/schemas');
const loginRouter = express.Router();

loginRouter.post(
  '/',
  validateSchemaAuthentication(schemaLogin),
  loginController.authenticate
);

module.exports = loginRouter;

const express = require('express');
const userController = require('../controllers/user.controller.js');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaUser } = require('../middleware/schemas');

const userRouter = express.Router();

userRouter.post(
  '/',
  validateSchema(schemaUser),
  userController.add,
);

module.exports = userRouter;

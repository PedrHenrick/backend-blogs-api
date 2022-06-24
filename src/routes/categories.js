const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const authenticateMiddleware = require('../middleware/authenticateMiddleware.js');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaCategory } = require('../middleware/schemas');

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  authenticateMiddleware,
  validateSchema(schemaCategory),
  categoriesController.add,
);

module.exports = categoriesRouter;

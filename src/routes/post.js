const express = require('express');
const postController = require('../controllers/post.controller');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaPost } = require('../middleware/schemas');

const postRouter = express.Router();

postRouter.get('/', authenticateMiddleware, postController.getAll);
postRouter.post(
  '/',
  authenticateMiddleware,
  validateSchema(schemaPost),
  postController.add,
);

module.exports = postRouter;

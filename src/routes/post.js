const express = require('express');
const postController = require('../controllers/post.controller');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaPost_update, schemaPost_post } = require('../middleware/schemas');

const postRouter = express.Router();

postRouter.get('/', authenticateMiddleware, postController.getAll);
postRouter.get('/:id', authenticateMiddleware, postController.getById);
postRouter.post(
  '/',
  authenticateMiddleware,
  validateSchema(schemaPost_post),
  postController.add,
);
postRouter.put(
  '/:id',
  authenticateMiddleware,
  validateSchema(schemaPost_update),
  postController.update,
);

module.exports = postRouter;

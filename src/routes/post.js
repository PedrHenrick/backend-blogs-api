const express = require('express');
const postController = require('../controllers/post.controller');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaPostUpdate, schemaPostPost } = require('../middleware/schemas');

const postRouter = express.Router();

postRouter.get('/', authenticateMiddleware, postController.getAll);
postRouter.get('/:id', authenticateMiddleware, postController.getById);
postRouter.post(
  '/',
  authenticateMiddleware,
  validateSchema(schemaPostPost),
  postController.add,
);
postRouter.put(
  '/:id',
  authenticateMiddleware,
  validateSchema(schemaPostUpdate),
  postController.update,
);
postRouter.delete(
  '/:id',
  authenticateMiddleware,
  postController.deletePost,
);

module.exports = postRouter;

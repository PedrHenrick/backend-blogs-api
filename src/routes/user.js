const express = require('express');
const userController = require('../controllers/user.controller.js');
const authenticateMiddleware = require('../middleware/authenticateMiddleware.js');
const validateSchema = require('../middleware/middlewareValidate');
const { schemaUser } = require('../middleware/schemas');

const userRouter = express.Router();

userRouter.get('/', authenticateMiddleware, userController.getAll);
userRouter.get('/:id', authenticateMiddleware, userController.getById);
userRouter.post('/', validateSchema(schemaUser), userController.add);
userRouter.delete('/me', authenticateMiddleware, userController.deleteMe);

module.exports = userRouter;

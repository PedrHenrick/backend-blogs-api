const joi = require('joi');

const errorMessage = 'Some required fields are missing';

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  '*': errorMessage,
});

const schemaUser = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const schemaCategory = joi.object({
  name: joi.string().required(),
});

const schemaPostPost = joi.object({
  title: joi.string().min(1).required(),
  content: joi.string().min(1).required(),
  categoryIds: joi.array().min(1).required(),
}).messages({
  '*': errorMessage,
});

const schemaPostUpdate = joi.object({
  title: joi.string().min(1).required(),
  content: joi.string().min(1).required(),
}).messages({
  '*': errorMessage,
});

module.exports = {
  schemaLogin,
  schemaUser,
  schemaCategory,
  schemaPostPost,
  schemaPostUpdate,
};

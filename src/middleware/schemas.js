const joi = require('joi');

const errorMessage = 'Some required fields are missing';

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'any.required': errorMessage,
  'string.empty': errorMessage,
  'string.email': errorMessage,
  'string.min': errorMessage,
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

const schemaPost = joi.object({
  title: joi.string().min(1).required(),
  content: joi.string().min(1).required(),
  categoryIds: joi.array().min(1).required(),
}).messages({
  'any.required': errorMessage,
  'string.empty': errorMessage,
  'string.min': errorMessage,
  'array.empty': errorMessage,
  'array.min': errorMessage,
});

module.exports = { schemaLogin, schemaUser, schemaCategory, schemaPost };

const joi = require('joi');

const schemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'string.email': 'Some required fields are missing',
  'string.min': 'Some required fields are missing',
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
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'string.min': 'Some required fields are missing',
  'array.empty': 'Some required fields are missing',
  'array.min': 'Some required fields are missing'
});

module.exports = { schemaLogin, schemaUser, schemaCategory, schemaPost };

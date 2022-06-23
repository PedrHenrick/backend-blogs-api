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

module.exports = { schemaLogin, schemaUser };

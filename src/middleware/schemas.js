const joi = require('joi');

const schemaLogin = joi.object({
  email: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
});

module.exports = { schemaLogin };

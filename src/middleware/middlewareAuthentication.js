const validateSchemaAuthentication = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validateSchemaAuthentication;

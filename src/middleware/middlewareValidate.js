const returnArray = (object) => {
  if (object[0]) return object;
  return [object];
};

const validateSchema = (schema) => (req, res, next) => {
  const itemsForVerification = returnArray(req.body);

  itemsForVerification.forEach((item) => {
    const { error } = schema.validate(item, { abortEarly: false });
    if (error) {
      const messages = error.details[0].message;
      return res.status(400).json({ message: messages });
    }
  });
  next();
};

module.exports = validateSchema;

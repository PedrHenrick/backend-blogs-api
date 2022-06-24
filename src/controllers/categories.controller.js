const categoriesService = require('../services/categories.service');

const add = async (req, res) => {
  const categories = await categoriesService.add(req.body);
  res.status(201).json(categories);
};

module.exports = { add };

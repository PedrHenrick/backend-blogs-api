const categoriesService = require('../services/categories.service');

const getAll = async (_req, res) => {
  const allCategories = await categoriesService.getAll();
  res.status(200).json(allCategories);
};

const add = async (req, res) => {
  const categories = await categoriesService.add(req.body);
  res.status(201).json(categories);
};

module.exports = { getAll, add };

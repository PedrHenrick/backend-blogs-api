const { Category } = require('../database/models');

const errorObjectCategoryExist = { status: 400, message: 'Category exists' };

const getAll = async () => {
  const allCategories = await Category.findAll({ order: [['id', 'ASC']] });
  return allCategories;
};

const add = async (categoryInformations) => {
  try {
    const hasCategoryAdded = await Category.create(categoryInformations);
    return hasCategoryAdded;
  } catch (_e) {
    throw errorObjectCategoryExist;
  }
};

module.exports = { getAll, add }; 
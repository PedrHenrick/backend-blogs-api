const { BlogPost, PostCategory } = require('../database/models');
const categoriesService = require('../services/categories.service');
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const sequelize = new Sequelize(config.development);

const errorObjectCategoryId = { status: 400, message: '"categoryIds" not found' }

const add = async (title, content, userId, categoryIds) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const allCategories = await categoriesService.getAll();
      const idCategories = allCategories.map(({ dataValues: { id } }) => id);
      const compare = categoryIds.every((categoryId) => idCategories.includes(categoryId));

      if (!compare) throw errorObjectCategoryId;

      const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      await categoryIds.map((id) => PostCategory.create({ postId: blogPost.id, categoryId: id }));      
      return blogPost;
    });
    return result;
  } catch (e) {
    throw e;
  }
};

module.exports = { add };

const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const categoriesService = require('./categories.service');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const errorObjectCategoryId = { status: 400, message: '"categoryIds" not found' };
const errorObjectTransaction = { status: 500, message: 'Transaction fail' };

const getAll = async () => BlogPost.findAll({
  include: [
    { model: User, as: "user", attributes: { exclude: ['password'] } },
    { model: Category, as: "categories" },
  ]
});

const add = async (title, content, userId, categoryIds) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const allCategories = await categoriesService.getAll();
      const idCategories = allCategories.map(({ dataValues: { id } }) => id);
      const compare = categoryIds.every((categoryId) => idCategories.includes(categoryId));
      
      if (!compare) throw errorObjectCategoryId;
      
      const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      
      await Promise.all(categoryIds.map((id) => PostCategory.create(
        { postId: blogPost.id, categoryId: id }, { transaction: t },
      )));
      
      return blogPost;
    });
    return result;
  } catch (e) {
    console.log(e);
    throw errorObjectTransaction;
  }
};

module.exports = { getAll, add };

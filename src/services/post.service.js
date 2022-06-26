const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const categoriesService = require('./categories.service');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const errorObjectCategoryId = { status: 400, message: '"categoryIds" not found' };
const errorObjectTransaction = { status: 500, message: 'Transaction fail' };
const errorObjectPostId = { status: 404, message: 'Post does not exist' };
const errorObjectUserDiferent = { status: 401, message: 'Unauthorized user' };

const getAll = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
});

const getById = async ({ id }) => {
  const hasPost = await BlogPost.findOne({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
    where: { id },
  });

  if (!hasPost) throw errorObjectPostId;

  return hasPost;
};

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

const update = async (updateInformation, idUserLogged, { id }) => {
  const post = await getById({ id });
  if (post.userId !== idUserLogged) throw errorObjectUserDiferent;
  
  await BlogPost.update(updateInformation, { where: { id } });
  
  const postUpdate = await getById({ id });
  return postUpdate;
};

const deletePost = async (idUserLogged, { id }) => {
  const post = await getById({ id });
  if (!post) throw errorObjectPostId;
  if (post.userId !== idUserLogged) throw errorObjectUserDiferent;
  
  await BlogPost.destroy({ where: { id } });
  return true;
};

module.exports = { getAll, getById, add, update, deletePost };

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
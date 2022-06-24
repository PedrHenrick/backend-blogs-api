const postCategorieSchema = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, { timestamps: false });

  postCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: postCategoryTable,
        foreignKey: 'postId',
        otherKey: 'categoryId'
    });
    models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: postCategoryTable,
        foreignKey: 'categoryId',
        otherKey: 'postId'
    });
  };


  return postCategoryTable;
};

module.exports = postCategorieSchema;

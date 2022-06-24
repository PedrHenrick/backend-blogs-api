const blogPostSchema = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  blogPostTable.associate = models => {
    blogPostTable.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return blogPostTable;
};


module.exports = blogPostSchema;

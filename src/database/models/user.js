const userSchema = (sequelize, DataTypes) => {  
  const userTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { timestamps: false });

  userTable.associate = models => {
    userTable.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'blogPosts'
    })
  }

  return userTable;
};

module.exports = userSchema;

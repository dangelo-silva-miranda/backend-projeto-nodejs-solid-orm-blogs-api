const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

/*   category.associate = (models) => {
    category.belongsToMany(models.BlogPost, {
      as: 'posts', through: 'PostsCategories', foreignKey: 'categoryId', otherKey: 'postId',
    });
  }; */

  return category;
};

module.exports = Category;
/*
  Material consultado sobre allowNull e unique
  https://sequelize.org/master/manual/validations-and-constraints.html
*/
const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
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
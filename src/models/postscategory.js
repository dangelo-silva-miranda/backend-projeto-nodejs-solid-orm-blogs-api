/*
  Material consultado sobre allowNull e unique
  https://sequelize.org/master/manual/validations-and-constraints.html

  Material consultado sobre foreignKey e otherKey
  https://sequelize.org/master/manual/advanced-many-to-many.html
  https://dev.to/projectescape/the-comprehensive-sequelize-cheatsheet-3m1m
*/
const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

  postsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', through: 'PostsCategory', foreignKey: 'categoryId', otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', through: 'PostsCategory', foreignKey: 'postId', otherKey: 'categoryId' });
  };
  
  return postsCategory;
};

module.exports = PostsCategory;
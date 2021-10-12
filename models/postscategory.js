const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

  postsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', through: 'PostsCategories', foreignKey: 'categoryId', otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', through: 'PostsCategories', foreignKey: 'postId', otherKey: 'categoryId' });
  };
  
  return postsCategory;
};

module.exports = PostsCategory;
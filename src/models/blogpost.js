/*
  Material consultado sobre allowNull e unique
  https://sequelize.org/master/manual/validations-and-constraints.html
*/
const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  }, {
    updatedAt: 'updated',
    createdAt: 'published',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

/*     blogPost.belongsToMany(models.Category, {
      as: 'categories', through: 'PostsCategories', foreignKey: 'postId', otherKey: 'categoryId' }); */
  };

  return blogPost;
};

module.exports = BlogPost;
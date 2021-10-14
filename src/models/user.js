/*
  Material consultado sobre allowNull e unique
  https://sequelize.org/master/manual/validations-and-constraints.html
*/
const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogposts',
    });
  };

  return user;
};

module.exports = User;
'use strict';
module.exports = {
  /*
    Material consultado sobre allowNull e unique
    https://sequelize.org/master/manual/validations-and-constraints.html
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};
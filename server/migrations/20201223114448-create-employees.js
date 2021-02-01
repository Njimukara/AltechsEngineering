'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      Employee_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Employee_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Account_Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Employee_Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Employee_Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Employee_Phone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Employee_StartDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};
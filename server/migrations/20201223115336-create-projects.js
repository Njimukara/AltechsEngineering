'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      Project_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Project_Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Project_Type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Project_SubType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Project_Author: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Project_Description: {
        type: Sequelize.STRING
      },
      Project_status: {
        type: Sequelize.INTEGER
      },
      StartDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      EndDate: {
        type: Sequelize.DATE
      },
      Completion_Rate: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Projects');
  }
};
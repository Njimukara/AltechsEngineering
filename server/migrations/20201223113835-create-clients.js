'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      Client_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Client_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Account_Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Client_Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Client_Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Client_Phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Clients');
  }
};
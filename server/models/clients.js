'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clients.init({
    Client_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    Client_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Account_Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Client_Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Client_Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Client_Phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Clients',
  });
  return Clients;
};
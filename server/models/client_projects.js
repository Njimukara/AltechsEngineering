'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client_Projects.init({
    Client_ID: DataTypes.INTEGER,
    Project_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Client_Projects',
  });
  return Client_Projects;
};
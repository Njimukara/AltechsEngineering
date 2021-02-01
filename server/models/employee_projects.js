'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employee_Projects.init({
    Employee_ID: DataTypes.STRING,
    Project_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee_Projects',
  });
  return Employee_Projects;
};
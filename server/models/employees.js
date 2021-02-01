'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employees.init({
    Employee_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Employee_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Account_Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Employee_Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Employee_Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Employee_Phone:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
    Employee_StartDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Employees',
  });
  return Employees;
};
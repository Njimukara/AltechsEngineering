'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Projects.init({
    Project_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Project_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Project_Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Project_SubType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Project_Author: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Project_Description: DataTypes.STRING,
    Project_status: DataTypes.INTEGER,
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: DataTypes.DATE,
    Completion_Rate: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};
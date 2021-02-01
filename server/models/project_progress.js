'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Project_Progress.init({
    Progress_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Project_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Progress_Title: DataTypes.STRING,
    Progress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project_Progress',
  });
  return Project_Progress;
};
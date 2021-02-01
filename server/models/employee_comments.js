'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employee_Comments.init({
    Employee_ID: DataTypes.INTEGER,
    Comment_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee_Comments',
  });
  return Employee_Comments;
};
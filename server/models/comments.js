'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comments.init({
    Comment_Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Project_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Authors_Id: DataTypes.INTEGER,
    Subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Comment_Date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
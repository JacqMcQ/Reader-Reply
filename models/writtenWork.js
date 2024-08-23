const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WrittenWork extends Model {}

WrittenWork.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    existingWorkId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "writtenWork",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = WrittenWork;
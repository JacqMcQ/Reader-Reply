const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WrittenWork extends Model {}

WrittenWork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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
      references: {
        model: "writtenWork",
        key: "id",
      },
      allowNull: true,
    },
    collectionTitle: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field for collection title
    },
  },
  {
    sequelize,
    modelName: "writtenWork",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = WrittenWork;

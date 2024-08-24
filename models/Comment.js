// models/Comment.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    workId: {
      type: DataTypes.INTEGER,
      references: {
        model: "writtenWork",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "comment",
  }
);

module.exports = Comment;

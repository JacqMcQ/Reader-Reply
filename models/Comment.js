// Import required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Comment model class
class Comment extends Model {}

// Initialize the Comment model with its schema
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

// Export the Comment model
module.exports = Comment;

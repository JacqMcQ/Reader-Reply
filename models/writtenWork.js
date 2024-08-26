// Import required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the WrittenWork model class
class WrittenWork extends Model {}

// Initialize the WrittenWork model with its schema
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
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "writtenWork",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

// Export the WrittenWork model
module.exports = WrittenWork;

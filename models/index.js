// Import required modules
const User = require("./User");
const WrittenWork = require("./writtenWork");
const Comment = require("./Comment");

// Define associations between User and WrittenWork
User.hasMany(WrittenWork, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

WrittenWork.belongsTo(User, {
  foreignKey: "userId",
});

WrittenWork.hasMany(WrittenWork, {
  foreignKey: "existingWorkId",
  as: "RelatedWorks",
});

WrittenWork.belongsTo(WrittenWork, {
  foreignKey: "existingWorkId",
  as: "OriginalWork",
});

WrittenWork.hasMany(Comment, {
  foreignKey: "workId",
  onDelete: "CASCADE",
});

Comment.belongsTo(WrittenWork, {
  foreignKey: "workId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

// Export the models with their defined associations
module.exports = { User, WrittenWork, Comment };

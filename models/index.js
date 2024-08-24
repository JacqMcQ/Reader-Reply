const User = require("./User");
const WrittenWork = require("./WrittenWork");
const Comment = require("./Comment");

// Define relationships
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

User.hasMany(WrittenWork, { foreignKey: "userId", onDelete: "CASCADE" });
WrittenWork.belongsTo(User, { foreignKey: "userId" });

WrittenWork.hasMany(Comment, { foreignKey: "workId", onDelete: "CASCADE" });
Comment.belongsTo(WrittenWork, { foreignKey: "workId" });

Comment.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, WrittenWork, Comment };

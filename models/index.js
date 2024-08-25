const User = require("./User");
const WrittenWork = require("./writtenWork");
const Comment = require("./Comment");

// Define relationships

// A User can have many WrittenWorks
User.hasMany(WrittenWork, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// A WrittenWork belongs to a User
WrittenWork.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// A WrittenWork can have many related WrittenWorks (e.g., works that belong to a collection)
WrittenWork.hasMany(WrittenWork, {
  foreignKey: "existingWorkId",
  as: "RelatedWorks",
});

// A WrittenWork can belong to an original WrittenWork (e.g., if it's part of a collection)
WrittenWork.belongsTo(WrittenWork, {
  foreignKey: "existingWorkId",
  as: "OriginalWork",
});

// A WrittenWork can have many Comments
WrittenWork.hasMany(Comment, {
  foreignKey: "workId",
  onDelete: "CASCADE",
});

// A Comment belongs to a WrittenWork
Comment.belongsTo(WrittenWork, {
  foreignKey: "workId",
  onDelete: "CASCADE",
});

// A Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = { User, WrittenWork, Comment };

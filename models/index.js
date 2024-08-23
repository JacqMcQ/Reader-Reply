const User = require("./User");
const WrittenWork = require("./WrittenWork");

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

module.exports = { User, WrittenWork };

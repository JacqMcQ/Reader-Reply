const sequelize = require("./config/connection");

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

testConnection();

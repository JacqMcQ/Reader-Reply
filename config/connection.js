// Import Sequelize library
const Sequelize = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance, using DB_URL if available, otherwise use individual credentials
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );

// Export the Sequelize instance
module.exports = sequelize;
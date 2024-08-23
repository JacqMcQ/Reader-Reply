// Core modules and dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Import routes, database connection, and helpers
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure session settings
const sess = {
  secret: process.env.SESSION_SECRET || "Super secret secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS for production
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// Middleware setup
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Use routes
app.use(routes);

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
  );
});

const { User, WrittenWork } = require("./models");

const syncModels = async () => {
  try {
    await User.sync({ alter: true }); // Use alter to apply changes
    await WrittenWork.sync({ alter: true });
    console.log("Models synced successfully");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

syncModels();
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
  secret: "Super secret secret",
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
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
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const syncModelsAndStartServer = async () => {
  try {
    // Sync models with { alter: true } to apply any schema changes without dropping tables
    await sequelize.sync({ alter: true, logging: console.log }); // Sync all models at once

    // Alternatively, you can sync individual models:
    // await User.sync({ alter: true });
    // await WrittenWork.sync({ alter: true });

    console.log("Models synced successfully");

    // Start the server after models are synced
    app.listen(PORT, () =>
      console.log(`Server listening at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};
syncModelsAndStartServer();
// Core Node.js module for file paths
const path = require("path");

// Express framework
const express = require("express");

// Session middleware
const session = require("express-session");

// Handlebars template engine
const exphbs = require("express-handlebars");

// Sequelize session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Import routes
const routes = require("./controllers");

// Database connection
const sequelize = require("./config/connection");

// Custom Handlebars helpers
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001; // Set port

// Configure session settings
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use session middleware
app.use(session(sess));

// Set up Handlebars with helpers
const hbs = exphbs.create({ helpers });

// Set Handlebars as view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use(routes);

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening at http://localhost:3001"));
});


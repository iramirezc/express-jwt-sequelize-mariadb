require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const apiRouter = require("./src/api");
const db = require("./src/db/models");

const app = express();

// make db available
app.set("db", db);

// middleware
app.use(logger("dev"));
app.use(express.json());

// API routes
app.use("/api", apiRouter);

// welcome index page
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome!</h1><p>Start by exploring the API.</p>");
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found."));
});

// error handlers
app.use(require("./src/middleware/logError"));
app.use(require("./src/middleware/clientError"));
app.use(require("./src/middleware/serverError"));

module.exports = app;

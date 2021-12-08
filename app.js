require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

const apiRouter = require("./src/api");

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());

// API routes
app.use("/api", apiRouter);

// welcome index page
app.use("/", (req, res) => {
  res.status(200).send("<h1>Welcome!</h1><p>Start by exploring the API.</p>");
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found."));
});

// error handlers
app.use(require("./src/middleware/errorLogger"));

app.use((err, req, res, next) => {
  const error = req.app.get("env") === "development" ? err : createError(500);
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message,
  });
});

// start
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

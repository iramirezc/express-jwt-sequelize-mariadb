const createError = require("http-errors");
const { errorResponse } = require("../utils/response");

module.exports = (err, req, res) => {
  // Create a generic 500 Server error when in production.
  const error =
    req.app.get("env") === "production"
      ? createError(500, "Oops! Something went wrong.")
      : err;

  res.status(error.status || 500).json(errorResponse(error));
};

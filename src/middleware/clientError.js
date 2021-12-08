const { ValidationError } = require("sequelize");
const { HttpError } = require("http-errors");
const { JsonWebTokenError } = require("jsonwebtoken");
const { failResponse } = require("../utils/response");

module.exports = (err, req, res, next) => {
  // Handle Sequelize errors
  if (err instanceof ValidationError) {
    let data = null;

    // If err.errors is an array,
    // attach every path (field) with the corresponding message.
    // The data object will have a shape of:
    // {
    //    "firstName": "User.firstName cannot be null",
    //    "lastName":  "User.lastName cannot be null"
    // }
    if (Array.isArray(err.errors) && err.errors.length) {
      data = err.errors.reduce((errors, { path, message }) => {
        errors[path] = message;
        return errors;
      }, {});
    }

    res.status(400).json(failResponse(data));

    return;
  }

  // Handle HttpError below 500 status code
  if (err instanceof HttpError && err.status < 500) {
    // By default set the error message.
    let data = { error: err.message };

    // If the error has a single path (field) use it as the key.
    if (err.path && typeof err.path === "string") {
      data = { [err.path]: err.message };
    }

    // TODO: what if we receive multiple paths?

    res.status(err.status).json(failResponse(data));

    return;
  }

  // Handle JsonWebTokenError
  if (err instanceof JsonWebTokenError) {
    // By default set the error message.
    const data = { error: err.message };

    res.status(err.status || 401).json(failResponse(data));

    return;
  }

  next(err);
};

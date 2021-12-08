const authenticated = require("./authenticated");
const authorized = require("./authorized");
const adminOnly = require("./adminOnly");
const logError = require("./logError");
const clientError = require("./clientError");

module.exports = {
  authenticated,
  authorized,
  adminOnly,
  logError,
  clientError,
};

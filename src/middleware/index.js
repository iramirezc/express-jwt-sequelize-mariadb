const authenticated = require("./authenticated");
const authorized = require("./authorized");
const adminOnly = require("./adminOnly");
const errorLogger = require("./errorLogger");

module.exports = {
  authenticated,
  authorized,
  adminOnly,
  errorLogger,
};

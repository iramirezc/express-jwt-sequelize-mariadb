const authenticated = require("./authenticated");
const authorized = require("./authorized");
const { ADMIN_TYPE } = require("../constants/user-types");

module.exports = [authenticated, authorized(ADMIN_TYPE)];

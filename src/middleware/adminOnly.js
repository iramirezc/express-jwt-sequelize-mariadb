const authenticated = require("./authenticated");
const authorized = require("./authorized");
const { ADMIN_TYPE } = require("../constants/userTypes");

module.exports = [authenticated, authorized(ADMIN_TYPE)];

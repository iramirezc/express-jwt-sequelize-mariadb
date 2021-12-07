const createError = require("http-errors");

module.exports =
  (...userTypes) =>
  (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return next(
        createError(403, "Unauthorized.", {
          reason: `User type is: ${req.user.userType}`,
        })
      );
    }

    next();
  };

const createError = require("http-errors");

module.exports =
  (...userTypes) =>
  (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      next(
        createError(403, "Who are you?", {
          reason: `UserType '${req.user.userType}' is not invited.`,
        })
      );

      return;
    }

    next();
  };

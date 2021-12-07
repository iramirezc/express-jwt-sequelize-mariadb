const createError = require("http-errors");
const { User } = require("../../db/models");
const { successResponse } = require("../../utils/response");
const { createJWT } = require("../../utils/auth");

/**
 * Responds with a JWT if user credentials are valid.
 */
const login = (req, res, next) => {
  let userId;

  if (!req.body.email) {
    return next(createError(400, "email must be provided."));
  }

  if (!req.body.password) {
    return next(createError(400, "password must be provided."));
  }

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        throw createError(401, "Invalid credentials.", {
          reason: "Email not found.",
        });
      }

      userId = user.id;

      return user.validatePassword(req.body.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        throw createError(401, "Invalid credentials.", {
          reason: "Invalid password.",
        });
      }

      const token = createJWT({ userId });

      res.status(200).json(successResponse({ token }));
    })
    .catch(next);
};

/**
 * Responds with user info.
 * Requires authentication.
 */
const whoami = (req, res) => {
  res.status(200).json(successResponse(User.sanitize(req.user)));
};

module.exports = {
  login,
  whoami,
};

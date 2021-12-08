const createError = require("http-errors");
const { User } = require("../../db/models");
const { successResponse } = require("../../utils/response");
const { createJWT } = require("../../utils/auth");

/**
 * Create a new User account.
 */
const signUp = (req, res, next) => {
  User.create(req.body, {
    fields: ["firstName", "lastName", "email", "password"],
  })
    .then((user) => {
      res.status(201).json(successResponse(User.sanitize(user)));
    })
    .catch(next);
};

/**
 * Respond with a JWT if user credentials are valid.
 */
const signIn = (req, res, next) => {
  let userId;

  if (!req.body.email) {
    next(createError(400, "email must be provided.", { path: "email" }));
    return;
  }

  if (!req.body.password) {
    next(createError(400, "password must be provided.", { path: "password" }));
    return;
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
 * Respond with user info.
 * NOTE: Requires authentication.
 */
const whoami = (req, res) => {
  res.status(200).json(successResponse(User.sanitize(req.user)));
};

module.exports = {
  signUp,
  signIn,
  whoami,
};

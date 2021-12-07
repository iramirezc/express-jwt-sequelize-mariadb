const { User } = require("../../db/models");
const { successResponse } = require("../../utils/response");

/**
 * Create a new account (User).
 */
const signup = (req, res, next) => {
  User.create(req.body, {
    fields: ["firstName", "lastName", "email", "password"],
  })
    .then((user) => {
      res.status(201).json(successResponse(User.sanitize(user)));
    })
    .catch(next);
};

module.exports = {
  signup,
};

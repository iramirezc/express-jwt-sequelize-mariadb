const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

class AuthController {
  static login(req, res, next) {
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

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
        });

        res.status(200).json({
          status: "success",
          data: { token },
        });
      })
      .catch((err) => next(createError(500, err)));
  }
}

module.exports = AuthController;

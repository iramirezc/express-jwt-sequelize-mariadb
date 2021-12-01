const createError = require("http-errors");
const { User } = require("../../db/models");

class UserController {
  static getAll(req, res, next) {
    User.findAll({
      attributes: {
        exclude: ["password"],
      },
    })
      .then((users) => {
        res.status(200).json({
          status: "success",
          data: users,
        });
      })
      .catch((err) => next(createError(500, err)));
  }
}

module.exports = UserController;

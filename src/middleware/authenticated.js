const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { User } = require("../db/models");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  const token = String(authorization).split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(401, err, { reason: "Invalid Token" }));
    }

    const { userId } = decoded;

    User.findByPk(userId, { attributes: { exclude: ["password", "userType"] } })
      .then((user) => {
        if (!user) {
          throw createError(401, "Unauthorized", {
            reason: "User not found.",
          });
        }

        req.user = User.sanitize(user);

        next();
      })
      .catch(next);
  });
};

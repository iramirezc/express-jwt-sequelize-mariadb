const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Hashes user password.
 * @param {User} user
 * @returns Promise
 */
const hashPassword = (user) => {
  const saltRounds = 10;

  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      return user;
    });
};

/**
 * Compares given string with user password.
 * @param {User} user
 * @param {string} password
 * @returns Promise
 */
const validatePassword = (user, password) => {
  return bcrypt.compare(password, user.password);
};

/**
 * Creates a Json Web Token.
 * @param {*} payload
 * @returns string
 */
const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
  });
};

module.exports = {
  hashPassword,
  validatePassword,
  createJWT,
};

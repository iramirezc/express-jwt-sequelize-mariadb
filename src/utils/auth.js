const bcrypt = require("bcrypt");

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

module.exports = {
  hashPassword,
  validatePassword,
};

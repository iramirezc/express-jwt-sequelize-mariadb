const createError = require("http-errors");
const { User } = require("../db/models");
const { successResponse } = require("../utils/response");

/**
 * Retrieve all users from DB.
 */
const getAll = (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((users) => {
      res.status(200).json(successResponse(users));
    })
    .catch(next);
};

/**
 * Create a new user.
 */
const createUser = (req, res, next) => {
  User.create(req.body, {
    fields: ["firstName", "lastName", "email", "password"],
  })
    .then((user) => {
      res.status(201).json(successResponse(User.sanitize(user)));
    })
    .catch(next);
};

/**
 * Retrieve a user by Id.
 */
const getUserById = (req, res, next) => {
  User.findByPk(req.params.id, {
    attributes: {
      exclude: ["password"],
    },
  })
    .then((user) => {
      if (!user) {
        throw createError(404, "User not found.");
      }

      res.status(200).json(successResponse(User.sanitize(user)));
    })
    .catch(next);
};

/**
 * Update a user by Id.
 */
const updateUserById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        throw createError(404, "User not found.");
      }

      return user.update(req.body, {
        fields: ["firstName", "lastName", "password"],
      });
    })
    .then((user) => {
      res.status(200).json(successResponse(User.sanitize(user)));
    })
    .catch(next);
};

/**
 * Delete a user from DB.
 */
const deleteUserById = (req, res, next) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((result) => {
      res.status(200).json(successResponse({ result }));
    })
    .catch(next);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};

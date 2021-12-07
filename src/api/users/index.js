const express = require("express");
const UsersController = require("../../controllers/users");
const { authenticated, authorized } = require("../../middleware");
const { ADMIN_TYPE } = require("../../constants/user-types");
const router = express.Router();

// GET /api/users
router.get("/", authenticated, authorized(ADMIN_TYPE), UsersController.getAll);

// POST /api/users
router.post(
  "/",
  authenticated,
  authorized(ADMIN_TYPE),
  UsersController.createUser
);

// GET /api/users/:id
router.get(
  "/:id",
  authenticated,
  authorized(ADMIN_TYPE),
  UsersController.getUserById
);

// PUT /api/users/:id
router.put(
  "/:id",
  authenticated,
  authorized(ADMIN_TYPE),
  UsersController.updateUserById
);

// DELETE /api/users/:id
router.delete(
  "/:id",
  authenticated,
  authorized(ADMIN_TYPE),
  UsersController.deleteUserById
);

module.exports = router;

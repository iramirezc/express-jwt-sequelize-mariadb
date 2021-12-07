const { Model } = require("sequelize");
const { ADMIN_TYPE, USER_TYPE } = require("../../constants/user-types");
const { hashPassword, validatePassword } = require("../../utils/auth");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Validates user password.
     * @param {string} password
     * @returns Promise
     */
    validatePassword(password) {
      return validatePassword(this, password);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  const props = {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM([ADMIN_TYPE, USER_TYPE]),
      allowNull: false,
      defaultValue: USER_TYPE,
    },
  };

  const options = {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user) {
        return hashPassword(user);
      },
      beforeUpdate(user) {
        return hashPassword(user);
      },
    },
  };

  User.init(props, options);

  return User;
};

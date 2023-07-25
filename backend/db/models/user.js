"use strict";
// need to import Validator here??
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, { foreignKey: "userId" });
      User.hasMany(models.Spot, { foreignKey: "ownerId" });
      User.hasMany(models.Review, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // force username to be a combination of letters and numbers
          isAlphanumeric: true,
          len: [4, 30],
          isNotEmail(value) {
            // use Validator.isEmail (Validator package contains isEmail())
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
          // added empty string model validation to username!
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // force firstname to only include letters
          isAlpha: true,
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // force last name to only include letters
          isAlpha: true,
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // // adding validation to ensure we only allow letters and numbers, therefore we can't just entire a giant blank string
          // isAlphanumeric: true,
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        // use .binary here
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};

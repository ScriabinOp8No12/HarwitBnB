"use strict";
// need to import Validator here??
const { Model } = require("sequelize");
const Validator = require("validator");

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
          // force username to be a combination of letters, numbers, and optionally spaces
          isAlphaNumbericWithSpaces(value) {
            if (
              // regex that allows only letters and numbers, it can have spaces too
              !Validator.matches(value, /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]*$/)
            ) {
              throw new Error(
                "Username must contain a combination of letters and numbers. White spaces are allowed too!"
              );
            }
          },
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
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        // use .binary here
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          // // force password to be alphanumeric, does this actually work if we put this validator here? (NO because this is the hashedPassword)
          // isAlphanumeric: true,
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

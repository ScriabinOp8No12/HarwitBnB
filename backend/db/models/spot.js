"use strict";
const { Model } = require("sequelize");
const Validator = require("validator");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // defined many to one relationship between Spot table and User table, remember the foreign key is the non-primary key
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        // need to alias in Spot model NOT the User model!
        as: "Owner",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        // delete the spotImage too if we delete the spot
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        // delete Review if we delete the spot too!
        onDelete: "CASCADE",
      });
    }
    format() {
      this.dataValues.createdAt = moment(this.createdAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dataValues.updatedAt = moment(this.updatedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      return this;
    }
  }

  Spot.init(
    // added allowNull false to everything below to match migration
    {
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        // need custom unique validator, if it's only in the migration, it won't work with the Sequelize.ValidationError if statement
        validate: {
          isUnique: async function (value) {
            const spot = await Spot.findOne({ where: { address: value } });
            if (spot) {
              throw new Error("Address must be unique");
            }
          },
          // force address to be a combination of letters, numbers, and optionally spaces
          // can remove validation of "check if empty string" because this checks for that too
          isAlphaNumbericWithSpaces(value) {
            if (
              // regex that allows only letters and numbers, it can have spaces too
              !Validator.matches(value, /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]*$/)
            ) {
              throw new Error(
                "Invalid Address, it must contain a combination of letters and numbers, white spaces are allowed."
              );
            }
          },
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          isValidCityName(value) {
            if (!Validator.matches(value, /^[a-zA-Z\u00C0-\u017F\s-]+$/)) {
              throw new Error("City is invalid.");
            }
          },
          // this is how we check if it's empty (this if statement includes the "" with no spaces in between)
          notEmptyString(value) {
            if (value.length === 0 || value.trim().length === 0) {
              throw new Error("City cannot be empty.");
            }
          },
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          isAlphaWithSpaces(value) {
            if (
              // regex that allows only letters, it can have spaces too
              !Validator.matches(value, /^(?=.*[a-zA-Z])[a-zA-Z\s]*$/)
            ) {
              throw new Error("State is invalid.");
            }
          },
        },
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          notEmptyString(value) {
            if (value.length === 0 || value.trim().length === 0) {
              throw new Error("Country cannot be empty.");
            }
          },
        },
      },
      lat: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        // make sure latitude is between -90 and 90
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [0, 150],
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          len(value) {
            if (value.length < 30) {
              throw new Error("Description needs a minimum of 30 characters");
            }
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        // add custom validator that price has to be 0 or greater
        validate: {
          min: 0,
          // added max to be 1 trillion!
          max: 1000000000000,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};

"use strict";
const { Model } = require("sequelize");
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
          // add non empty string model validator here too!
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
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
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
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
          len: [0, 50],
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
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

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
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
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

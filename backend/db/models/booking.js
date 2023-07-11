"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // removed delete on cascade from below two associations!
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Booking.init(
    {
      spotId: {
        // added allowNull
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        // added allowNull
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isInt: false,
          isAfterToday(value) {
            // create new Date object, and pass in value of the startDate's value, then compare it to the current Date object (date right now)
            if (new Date(value) <= new Date()) {
              throw new Error("Start date must be after today!");
            }
          },
          // start date can't be empty either
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isInt: false,
          isAfterStartDate(value) {
            // same logic as isAfterToday() except now we compare the endDate's value with the startDate
            // use this.startDate to compare to the current Booking instance
            if (value <= this.startDate) {
              throw new Error("End date must be after start date!");
            }
          },
          // end date can't be empty
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};

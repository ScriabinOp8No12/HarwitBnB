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
      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
      Booking.belongsTo(models.User, { foreignKey: "userId" });
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
          isAfterToday(value) {
            // create new Date object, and pass in value of the startDate's value, then compare it to the current Date object (date right now)
            if (new Date(value) < new Date()) {
              throw new Error("Start date must be after today!");
            }
          },
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfterStartDate(value) {
            // same logic as isAfterToday() except now we compare the endDate's value with the startDate
            // use this.startDate to compare to the current Booking instance
            if (value < this.startDate) {
              throw new Error("End date must be after start date!");
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

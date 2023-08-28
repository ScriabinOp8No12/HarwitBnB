const moment = require("moment");
("use strict");
const { Model } = require("sequelize");
const Validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
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
  Review.init(
    {
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      review: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notOnlyNumbersOrWhiteSpaces(value) {
            if (!Validator.matches(value, /^(?!^\d+$)(?!^\s+$)^.*$/)) {
              throw new Error(
                "The review cannot contain only numbers or only white spaces"
              );
            }
          },
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
          len(value) {
            if (value.length > 3000) {
              throw new Error(
                "Review cannot be more than 3000 characters long"
              );
            }
          },
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        // add a custom validator allowing stars to be from 1 to 5 only
        validate: {
          // added this here because we don't want the user entering a star rating of 2.5 or 2.23456
          isInt: true,
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};

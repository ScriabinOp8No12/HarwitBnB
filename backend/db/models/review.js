"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      spotId: {
        // added allownull
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        // added allownull
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      review: {
        allowNull: false,
        type: DataTypes.STRING,
        // add non empty string model validator here too!
        validate: {
          notEmptyString(value) {
            if (value.length === 0) {
              throw new Error("Cannot be empty.");
            }
          },
          // review length can't be over 500
          len: [0, 500],
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
          // need non-empty string here too?!
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
      modelName: "Review",
    }
  );
  return Review;
};

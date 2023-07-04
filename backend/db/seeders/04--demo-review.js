"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "reviews",
      [
        {
          spotId: 1,
          userId: 1,
          review: "This spot is amazing!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 2,
          review: "Great experience at this spot.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 2,
          review: "This place was not great.",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};

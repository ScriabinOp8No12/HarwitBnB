"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spotImages",
      [
        {
          spotId: 1,
          url: "https://example.com/image1.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://example.com/image2.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://example.com/image3.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more spotImages records as needed
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spotImages", null, {});
  },
};

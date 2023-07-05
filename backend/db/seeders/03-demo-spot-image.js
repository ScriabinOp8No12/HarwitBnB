"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
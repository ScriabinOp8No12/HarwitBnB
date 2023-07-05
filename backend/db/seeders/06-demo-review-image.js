"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = { tableName: "ReviewImages" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "https://example.com/image7.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: 2,
          url: "https://example.com/image8.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: 3,
          url: "https://example.com/image9.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    let options = { tableName: "ReviewImages" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.bulkDelete(options, null, {});
  },
};

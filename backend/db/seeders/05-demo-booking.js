"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = { tableName: "Bookings" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2034-01-01",
          endDate: "2035-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2034-01-01",
          endDate: "2035-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2034-01-01",
          endDate: "2035-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    let options = { tableName: "Bookings" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }
    await queryInterface.bulkDelete(options, null, {});
  },
};

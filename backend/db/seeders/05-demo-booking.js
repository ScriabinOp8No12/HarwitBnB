"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          // SEEDER DATA FORMAT HAD TO BE LIKE THE UNCOMMENTED ONE BELOW, otherwise we get a really fun bug!
          // startDate: "2034-01-01",
          startDate: "2034-01-01 00:00:00.000",
          endDate: "2035-01-01 00:00:00.000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2034-01-01 00:00:00.000",
          endDate: "2035-01-01 00:00:00.000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2034-01-01 00:00:00.000",
          endDate: "2035-01-01 00:00:00.000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(options, null, {});
  },
};

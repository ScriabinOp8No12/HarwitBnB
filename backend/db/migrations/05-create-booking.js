"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // this block below HAS to go in every migration and seeder that we create!
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    await queryInterface.createTable(
      "Bookings",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          // added allowNull
          allowNull: false,
          type: Sequelize.INTEGER,
          // added references below
          references: { model: "Spots", key: "id" },
        },
        userId: {
          // added allowNull
          allowNull: false,
          type: Sequelize.INTEGER,
          // added references below
          references: { model: "Users", key: "id" },
        },
        startDate: {
          // made dates not be null either
          allowNull: false,
          type: Sequelize.DATE,
        },
        endDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    let options = { tableName: "Bookings" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }
    await queryInterface.dropTable(options);
  },
};

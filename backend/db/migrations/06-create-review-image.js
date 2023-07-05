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
      "ReviewImages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        reviewId: {
          // added allowNull
          allowNull: false,
          type: Sequelize.INTEGER,
          // added reference
          references: { model: "Reviews", key: "id" },
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING,
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
    let options = { tableName: "ReviewImages" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }
    await queryInterface.dropTable(options);
  },
};

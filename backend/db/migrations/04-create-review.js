"use strict";

// this block below HAS to go in every migration and seeder that we create!
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Reviews",
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
          // added reference below
          references: { model: "Spots", key: "id" },
          onDelete: "CASCADE",
        },
        userId: {
          // added allowNull
          allowNull: false,
          type: Sequelize.INTEGER,
          // added reference below
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
        review: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        stars: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Reviews", options);
  },
};

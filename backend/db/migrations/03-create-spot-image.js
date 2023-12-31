"use strict";

// this block below HAS to go in every migration and seeder that we create!
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "SpotImages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          // added allow null below
          allowNull: false,
          type: Sequelize.INTEGER,
          // added references to the TABLE Spots with key of id
          references: { model: "Spots", key: "id" },
          onDelete: "CASCADE",
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        preview: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("SpotImages", options);
  },
};

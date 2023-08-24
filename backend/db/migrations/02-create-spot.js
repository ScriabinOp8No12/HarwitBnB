"use strict";

// this block below HAS to go in every migration and seeder that we create!
let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          // added allowNull false
          allowNull: false,
          type: Sequelize.INTEGER,
          // added on delete cascade here
          onDelete: "CASCADE",
          // added foreign key reference to primary key of id in Users table
          references: { model: "Users", key: "id" },
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING,
          // added unique true here because can't have duplicate address
          unique: true,
        },
        city: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        lat: {
          allowNull: false,
          type: Sequelize.DECIMAL,
        },
        lng: {
          allowNull: false,
          type: Sequelize.DECIMAL,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("Spots", options);
  },
};

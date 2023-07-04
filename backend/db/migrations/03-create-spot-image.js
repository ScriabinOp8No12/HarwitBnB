"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SpotImages", {
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
      },
      url: {
        type: Sequelize.STRING,
      },
      preview: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SpotImages");
  },
};

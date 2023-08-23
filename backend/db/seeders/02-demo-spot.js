"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // moved the tableName value here instead of outside the up and down functions
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "Faroe Islands",
          city: "Thor's Harbour",
          state: "Kingdom of Denmark",
          country: "Kingdom of Denmark",
          lat: 62.01,
          lng: -6.77,
          name: "Faroe Islands",
          description: "A beautiful house in Faroe Islands",
          price: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          address: "789 Oak St",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          lat: 45.283235,
          lng: -45.840293,
          name: "Test Park",
          description: "A beautiful park in LA",
          price: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          address: "68000 Colmar",
          city: "Colmar",
          state: "North Eastern France",
          country: "France",
          lat: 48.07,
          lng: 7.36,
          name: "Colmar is renowned for its well preserved old town, and numerous landmarks and museums",
          description: "A house near a river at dusk",
          price: 195,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};

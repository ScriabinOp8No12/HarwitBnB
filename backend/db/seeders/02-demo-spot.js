"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = { tableName: "Spots" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }

    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "USA",
          lat: 40.712776,
          lng: -74.005974,
          name: "Central Park",
          description: "A beautiful park in the heart of New York City",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          address: "456 Elm St",
          city: "Chicago",
          state: "IL",
          country: "USA",
          lat: 41.878113,
          lng: -87.629799,
          name: "Millennium Park",
          description: "A large public park in Chicago",
          price: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // define the options object locally within the down function
    let options = { tableName: "Spots" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    return queryInterface.bulkDelete(options, null, {});
  },
};

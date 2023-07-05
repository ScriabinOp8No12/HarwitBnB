"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = { tableName: "Users" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }

    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Nathan",
          lastName: "Harwit",
          email: "test1@gmail.com",
          username: "bigfryy1",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Nathann",
          lastName: "Harwitt",
          email: "test@gmail.com",
          username: "bigfry1234512",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Nathannn",
          lastName: "Harwittt",
          email: "test2@gmail.com",
          username: "bigfry123123",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // define the options object locally within the down function
    let options = { tableName: "Users" };
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};

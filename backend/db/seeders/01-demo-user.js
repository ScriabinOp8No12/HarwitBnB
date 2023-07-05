"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
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
    options.tableName = "Users";
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

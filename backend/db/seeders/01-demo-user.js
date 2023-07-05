"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // put tableName here inside up function instead of outside
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
    const Op = Sequelize.Op;
    // added this line here, removed the let options block of code
    options.tableName = "Users";
    return queryInterface.bulkDelete(
      options,
      {
        // needed to rename the usernames below to match what we changed in seeder data!
        username: { [Op.in]: ["Nathan", "Nathann", "Nathannn"] },
      },
      {}
    );
  },
};

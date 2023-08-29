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
          username: "bigfry",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Alexander",
          lastName: "Scriabin",
          email: "test@gmail.com",
          username: "ScriabinFantasie",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Frederic",
          lastName: "Chopin",
          email: "test2@gmail.com",
          username: "ChopinNocturneCMinor",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sergei",
          lastName: "Rachmaninoff",
          email: "test3@gmail.com",
          username: "RachmaninoffMusicalMomentNo4",
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

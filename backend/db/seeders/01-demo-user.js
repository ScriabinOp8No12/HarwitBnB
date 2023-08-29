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
          email: "test@gmail.com",
          username: "bigfry",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Alexander",
          lastName: "Scriabin",
          email: "test1@gmail.com",
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
        {
          firstName: "Claude",
          lastName: "Debussy",
          email: "test4@gmail.com",
          username: "SuiteBergamasque",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Carl",
          lastName: "Filtsch",
          email: "test5@gmail.com",
          username: "PianoConcertoInBminor",
          hashedPassword: bcrypt.hashSync("password"),
        },
        // {
        //   firstName: "Amadeus",
        //   lastName: "Mozart",
        //   email: "test6@gmail.com",
        //   username: "SonataK545",
        //   hashedPassword: bcrypt.hashSync("password"),
        // },
        // {
        //   firstName: "Johannes",
        //   lastName: "Brahms",
        //   email: "test7@gmail.com",
        //   username: "IntermezzoAmajor",
        //   hashedPassword: bcrypt.hashSync("password"),
        // },
        // {
        //   firstName: "Vladimir",
        //   lastName: "Horowitz",
        //   email: "test8@gmail.com",
        //   username: "ScriabinOp8No12",
        //   hashedPassword: bcrypt.hashSync("password"),
        // },
        // {
        //   firstName: "Nikolai",
        //   lastName: "Lugansky",
        //   email: "test9@gmail.com",
        //   username: "RachmaninoffMusicalMomentNo4",
        //   hashedPassword: bcrypt.hashSync("password"),
        // },
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
      // **** This down function is so unbelievably wrong it's insane lol ****
      {
        // needed to rename the usernames below to match what we changed in seeder data!
        username: { [Op.in]: ["Nathan", "Nathann", "Nathannn"] },
      },
      {}
    );
  },
};

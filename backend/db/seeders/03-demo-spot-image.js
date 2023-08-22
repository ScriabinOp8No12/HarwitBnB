"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731556/10AirBnB_h6gwsd.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731565/11AirBnB_ilvvgs.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731553/7AirBnB_pdqgpb.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};

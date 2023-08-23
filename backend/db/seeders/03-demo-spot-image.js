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
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731565/11AirBnB_ilvvgs.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731570/12AirBnB_lcxc44.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731564/14AirBnB_dlzztc.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731566/15AirBnB_nqxppa.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731573/16AirBnB_hb6j0a.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731576/17AirBnB_tz8viz.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731570/18AirBnB_o6qext.jpg",
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

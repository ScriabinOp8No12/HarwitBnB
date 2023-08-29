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
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731556/Faroe%20Islands%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Faroe island no preview 1
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692817322/FaroeIslands1_ix8isg.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Faroe island no preview 2
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692817320/FaroeIslands2_oghhlt.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Faroe island no preview 3
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692817320/FaroeIslands3_wlomee.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Faroe island no preview 4
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692817324/FaroeIslands4_xymmxo.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Faroe island no preview 5
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692817320/FaroeIslands5_x7j9co.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731565/Colmar%20France%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France no preview 1
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267171/Colmar%20France%201.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France no preview 2
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267170/Colmar%20France%202.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France no preview 3
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267169/Colmar%20France%203.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France no preview 4
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267167/Colmar%20France%204.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Svolvaer, Norway
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731553/Nordland%20Norway%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Svolvaer, Norway no preview 1
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267830/Nordland_Norway_1_flxy1v.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Svolvaer, Norway no preview 2
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267829/Nordland_Norway_3_jnrgr8.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Svolvaer, Norway no preview 3
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267828/Nordland_Norway_4_w8c9jv.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Svolvaer, Norway no preview 4
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693267827/Nordland_Norway_2_nm7hld.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Hallstatt, Austria
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731596/Halstatt%20Austria%20Preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268452/Halstatt_Austria_1_ky8osc.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268451/Halstatt_Austria_3_gjql8c.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268452/Halstatt_Austria_2_bbpv4z.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268448/Halstatt_Austria_4_wliivs.jpg",
          preview: false,
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

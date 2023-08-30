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
        // Hallstatt, Austria no preview 1
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268452/Halstatt_Austria_1_ky8osc.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Hallstatt, Austria no preview 2
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268451/Halstatt_Austria_3_gjql8c.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Hallstatt, Austria no preview 3
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268452/Halstatt_Austria_2_bbpv4z.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Hallstatt, Austria no preview 4
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693268448/Halstatt_Austria_4_wliivs.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731595/Sri%20Lanka%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka no preview 1
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272138/Sri_Lanka_1_phsnws.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka no preview 2
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272138/Sri_Lanka_4_hhfb4i.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka no preview 3
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272136/Sri_Lanka_2_igsfu7.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka no preview 4
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272140/Sri_Lanka_3_ygicml.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln Switzerland
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731553/Sachseln%20Switzerland%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln Switzerland no preview 1
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272769/Sachseln_Switzerland_1_dy9fxj.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln Switzerland no preview 2
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272769/Sachseln_Switzerland_2_mmz2ss.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln Switzerland no preview 3
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272769/Sachseln_Switzerland_3_px2w0f.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln Switzerland no preview 4
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693272768/Sachseln_Switzerland_4_h4hys4.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Bled, Slovenia preview
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731588/Slovenia%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Bled, Slovenia no preview 1
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351393/Bled_Slovenia_4_q7omtq.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Bled, Slovenia no preview 2
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351393/Bled_Slovenia_1_maakyd.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Bled, Slovenia no preview 3
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351394/Bled_Slovenia_2_apgdtv.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Bled, Slovenia no preview 4
        {
          spotId: 7,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351395/Bled_Slovenia_3_nbrfia.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Liguria, Italy preview
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731574/Liguria%20Italy%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Liguria, Italy no preview 1
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351704/Laguria_Italy_3_exdtl4.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Liguria, Italy no preview 2
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351710/Laguria_Italy_2_z4lqcy.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Liguria, Italy no preview 3
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351711/Laguria_Italy_4_xh0cwe.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Liguria, Italy no preview 4
        {
          spotId: 8,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693351712/Laguria_Italy_1_vfb8so.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Prague, Czech preview
        {
          spotId: 9,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731572/Prague%2C%20Czech%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Prague, Czech no preview 1
        {
          spotId: 9,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693353975/Prague_Czech_3_wtilul.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Prague, Czech no preview 2
        {
          spotId: 9,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693353980/Prague_Czech_1_votmqm.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Prague, Czech no preview 3
        {
          spotId: 9,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693353981/Prague_Czech_2_rggp3v.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Prague, Czech no preview 4
        {
          spotId: 9,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693353981/Prague_Czech_4_sggaid.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Maldives preview
        {
          spotId: 10,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1692731586/Maldives%20preview.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Maldives no preview 1
        {
          spotId: 10,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693354298/Maldives_4_fr2nzj.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Maldives no preview 2
        {
          spotId: 10,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693354299/Maldives_1_qbtnak.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Maldives no preview 3
        {
          spotId: 10,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693354301/Maldives_3_kavbp6.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Maldives no preview 4
        {
          spotId: 10,
          url: "https://res.cloudinary.com/dxq77puhi/image/upload/v1693354304/Maldives_2_b2xwm9.jpg",
          preview: false,
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

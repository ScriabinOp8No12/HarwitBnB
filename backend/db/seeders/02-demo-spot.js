"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // moved the tableName value here instead of outside the up and down functions
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        // Faroe Islands, Denmark
        {
          ownerId: 1,
          address: "Faroe Islands",
          city: "Thor's Harbour",
          state: "Denmark",
          country: "Kingdom of Denmark",
          lat: 62.01,
          lng: -6.77,
          name: "Faroe Islands",
          description:
            "Faroe Islands is a North Atlantic island group and an autonomous territory of the Kingdom of Denmark. They are located 320 kilometres (200 mi) north-northwest of the United Kingdom, and about halfway between Norway (580 kilometres (360 mi) away) and Iceland (430 kilometres (270 mi) away). The islands form part of the Kingdom of Denmark, along with mainland Denmark and Greenland. The islands have a total area of about 1,400 square kilometres (540 sq mi) with a population of 54,000 as of June 2022.[9] The capital and largest city is Tórshavn. The terrain is rugged, and the subpolar oceanic climate (Cfc) is windy, wet, cloudy, and cool. Temperatures for such a northerly climate are moderated by the Gulf Stream, averaging above freezing throughout the year, hovering around 12 °C (54 °F) in summer and 5 °C (41 °F) in winter.[10] The northerly latitude also results in perpetual civil twilight during summer nights and very short winter days. Between 1035 and 1814, the Faroe Islands were part of the Kingdom of Norway, which was in a personal union with Denmark from 1380. In 1814, the Treaty of Kiel transferred Norway to Sweden, whereas Denmark kept its Atlantic territories, which included the Faroe Islands, Greenland and Iceland. Source: https://en.wikipedia.org/wiki/Faroe_Islands",
          price: 9001,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Colmar, France
        {
          ownerId: 2,
          address: "68000 Colmar",
          city: "Colmar",
          state: "France",
          country: "France",
          lat: 48.07,
          lng: 7.36,
          name: "Town in Colmar",
          description:
            "A house near a river at dusk, notice the waterways in France/Europe",
          price: 195,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Nordland Norway
        {
          ownerId: 3,
          address: "8300 Svolvaer",
          city: "Svolvaer",
          state: "Norway",
          country: "Norway",
          lat: 68.24,
          lng: 14.56,
          name: "Norway home on waternear mountains",
          description:
            "Lakehome near mountains in Norway, this image is likely photoshopped, I'm pretty sure it shouldn't look that orange",
          price: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Hallstatt Austria
        {
          ownerId: 4,
          address: "Hallstatt",
          city: "Oberosterreich",
          state: "Salzkammergut region",
          country: "Austria",
          lat: 47.56,
          lng: 13.65,
          name: "Homes near hillside in Hallstatt Austria",
          description:
            "Beautiful homes along hillside in Austria.  The lighting is lovely in this photograph, and it just looks so peaceful!",
          price: 175,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 5,
          address: "Marasvao",
          city: "Marvao",
          state: "Portugal",
          country: "Portugal",
          lat: 39.39,
          lng: -7.37,
          name: "Street view of Portugal homes",
          description: "Beautiful white colored homes in Portugal",
          price: 183,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 6,
          address: "Marvfsao",
          city: "Marvao",
          state: "Portugal",
          country: "Portugal",
          lat: 39.39,
          lng: -7.37,
          name: "Street view of Portugal homes",
          description: "Beautiful white colored homes in Portugal",
          price: 183,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 7,
          address: "Mafasdfrvao",
          city: "Marvao",
          state: "Portugal",
          country: "Portugal",
          lat: 39.39,
          lng: -7.37,
          name: "Street view of Portugal homes",
          description: "Beautiful white colored homes in Portugal",
          price: 183,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 8,
          address: "Marvaosdfgsdfg",
          city: "Marvao",
          state: "Portugal",
          country: "Portugal",
          lat: 39.39,
          lng: -7.37,
          name: "Street view of Portugal homes",
          description: "Beautiful white colored homes in Portugal",
          price: 183,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};

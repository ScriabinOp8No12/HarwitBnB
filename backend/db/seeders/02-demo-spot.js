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
          country: "Europe",
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
          country: "Europe",
          lat: 48.07,
          lng: 7.36,
          name: "Town in Colmar",
          description:
            "A house near a river at dusk, notice the waterways in France/Europe, they are beautiful",
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
          country: "Europe",
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
          state: "Austria",
          country: "Europe",
          lat: 47.56,
          lng: 13.65,
          name: "Homes near hillside in Hallstatt Austria",
          description:
            "Beautiful homes along hillside in Austria.  The lighting is lovely in this photograph, and it just looks so peaceful!",
          price: 175,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Dambulla, Sri Lanka
        {
          ownerId: 5,
          address: "Dambulla",
          city: "CP",
          state: "Sri Lanka",
          country: "South Asia",
          lat: 7.87,
          lng: 80.77,
          name: "Homes near ocean in Sri Lanka",
          description:
            "Beautiful homes along ocean in Dambulla, CP, Sri Lanka.  Time to go fishing everyday :)",
          price: 535,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sachseln, Switzerland
        {
          ownerId: 6,
          address: "Sachseln",
          city: "OW",
          state: "Switzerland",
          country: "Europe",
          lat: 46.82,
          lng: 8.23,
          name: "Home near snowy mountain in Switzerland",
          description:
            "Home near the mountain side of Switzerland, everything looks so blue and calm!",
          price: 232,
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

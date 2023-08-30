"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          review: "This spot is amazing!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          userId: 3,
          review: "Great experience at this spot.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 3,
          review:
            "This is some placeholder text instead of using lorem ipsum because that's boring, yeah, see I got your attention, oh by the way, I'm trying to test the review length wrap to see if it overflows the container or not.  Looks like it doesn't which is great.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          userId: 4,
          review: "This place was terrible, that's why I gave it 5 stars!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          userId: 1,
          review: "Decent, 3 stars, might visit again.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          userId: 3,
          review:
            "This is some placeholder text instead of using lorem ipsum because that's boring, yeah, see I got your attention, oh by the way, I'm trying to test the review length wrap to see if it overflows the container or not.  Looks like it doesn't which is great.",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 5,
          userId: 2,
          review: "This place wasn't too good, 2 stars",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 6,
          userId: 4,
          review: "This wast he best place ever, would come again!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 7,
          userId: 5,
          review: "Great place, will recommend to friends and family!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 8,
          userId: 7,
          review: "Excellent place, nice and relaxing!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 9,
          userId: 1,
          review: "This place was okay, there were some good and bad things.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 9,
          userId: 3,
          review:
            "This is some placeholder text instead of using lorem ipsum because that's boring, yeah, see I got your attention, oh by the way, I'm trying to test the review length wrap to see if it overflows the container or not.  Looks like it doesn't which is great.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";

    await queryInterface.bulkDelete(options, null, {});
  },
};

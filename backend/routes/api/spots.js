const express = require("express");
const { Sequelize } = require("sequelize");
// spot doesn't need auth?
const { requireAuth } = require("../../utils/auth");
// get the spot, spotimage, AND review models, because avgRating is the "stars" column from Review table, and
// we need the preview from the spotImage table
const { Spot, SpotImage, Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        // this line below would weed out 1 of the 3 seed data, so remove it since we need all the spots!
        // where: { preview: true },
      },
      {
        model: Review,
        // attributes option in findAll method allows us to specify which columns from the table we want to include in the result
        attributes: [
          // syntax for calling aggregate function "AVERAGE" on the stars column
          // alias it as "avgRating" (change from "stars")
          [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
        ],
      },
    ],
    // need a group option to use AVG aggregate function when across multiple tables (render needs Reviews.id!!)
    group: ["Spot.id", "SpotImages.id", "Reviews.id"],
  });
  return res.json(spots);
});

module.exports = router;

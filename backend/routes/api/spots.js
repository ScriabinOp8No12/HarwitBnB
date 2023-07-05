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
        where: { preview: true },
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
    // need a group option to use AVG aggregate function when across multiple tables
    group: ["Spot.id", "SpotImages.id"],
  });
  return res.json(spots);
});

module.exports = router;

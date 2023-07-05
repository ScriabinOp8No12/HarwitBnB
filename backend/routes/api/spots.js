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
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT AVG(stars)
            FROM Reviews
            WHERE Reviews.spotId = Spot.id
          )`),
          "avgRating",
        ],
      ],
    },
    include: [
      {
        model: SpotImage,
        // this line below would weed out 1 of the 3 seed data, so remove it since we need all the spots!
        // where: { preview: true },
      },
    ],
  });
  return res.json(spots);
});

module.exports = router;

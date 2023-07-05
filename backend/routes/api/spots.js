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
      },
      {
        model: Review,
      },
    ],
  });

  // Calculate the average rating for each spot
  spots.forEach((spot) => {
    const reviews = spot.Reviews;
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    const avgRating = totalStars / reviews.length;
    spot.dataValues.avgRating = avgRating;
  });

  return res.json(spots);
});

// using requireAuth in post request
// router.post("/", requireAuth, (req, res) => {});

module.exports = router;

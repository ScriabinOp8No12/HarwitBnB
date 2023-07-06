const express = require("express");
// const { Sequelize } = require("sequelize");
// spot doesn't need auth?
const { requireAuth } = require("../../utils/auth");
// get the spot, spotimage, AND review models, because avgRating is the "stars" column from Review table, and
// we need the preview from the spotImage table
const { Spot, SpotImage, Review } = require("../../db/models");
const { UniqueConstraintError } = require("sequelize");

const router = express.Router();

// get all spots endpoint
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

  // Calculate the average rating for each spot by looping through the spot array we queried above
  spots.forEach((spot) => {
    // access the reviews from the spots
    const reviews = spot.Reviews;
    // reduce it to one value, start accumulator at 0
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    // now we divide that value by the amount of reviews we have to get the average
    const avgRating = totalStars / reviews.length;
    // now we alias the value to be 'avgRating'
    spot.dataValues.avgRating = avgRating;
  });

  return res.json(spots);
});

// using requireAuth in post request
// create a spot endpoint
router.post("/", requireAuth, async (req, res) => {
  let {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  const spotsData = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  return res.json(spotsData);
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  // find the spot by primary key, if that spot doesn't exist, then throw a 404 error
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "No spot found!" });
    // request holds the authenticated user's id
    // set that equal to the ownerId on the spot
  } else if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Not authorized!" });
  }
  const imageData = await SpotImage.create({
    spotId,
    url,
    preview,
  });
  return res.json(imageData);
}),
  (module.exports = router);

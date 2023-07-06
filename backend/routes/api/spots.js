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

  // this block of code below gave us the review data with it, which we don't really want
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

// using map below worked well for the other get endpoint -> see .get("/current")
// Calculate the average rating for each spot without including the review in the response
// const spotsWithAvgRating = spots.map((spot) => {
//   // access the reviews from the spots
//   const reviews = spot.Reviews;
//   // reduce it to one value, start accumulator at 0
//   const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
//   // now we divide that value by the amount of reviews we have to get the average
//   const avgRating = totalStars / reviews.length;
//   // Create a new object with the spot data and the calculated average rating
//   return { ...spot.dataValues, avgRating };
// });

//   return res.json(spotsWithAvgRating);
// });

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
});

// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  // Find all the spots owned by the current logged in user
  const spots = await Spot.findAll({
    // get only the spots that the current logged in user has
    where: { ownerId: req.user.id },
    // include the SpotImage model
    include: [{ model: SpotImage }],
    // only if the preview is true -> that way we can give the previewImage (url) too
    // include: [{ model: SpotImage, where: { preview: true } }]
  });
  // Calculate the average rating for each spot
  // use Promise.all to wait for all the Review.findAll promises to resolve -> see 4 lines below
  const spotsRatingPreview = await Promise.all(
    // use map instead of forEach()
    spots.map(async (spot) => {
      // we don't pass in review into the findAll, so it won't show up in the response
      const reviews = await Review.findAll({ where: { spotId: spot.id } });
      // use reduce to get the review down to one value, starting value is 0
      const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
      // divide by number of total reviews
      const avgRating = totalStars / reviews.length;
      // Extract the URL of the first preview image
      // const previewImage = spot.SpotImages[0].url;

      // use .dataValues to get the actually number back, and alias that as avgRating
      return { ...spot.dataValues, avgRating };
      // also add previewImage into response
      // return { ...spot.dataValues, avgRating, previewImage };
    })
  );
  return res.json(spotsRatingPreview);
});

module.exports = router;

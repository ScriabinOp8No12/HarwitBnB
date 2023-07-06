const express = require("express");
// const { Sequelize } = require("sequelize");
// spot doesn't need auth?
const { requireAuth } = require("../../utils/auth");
// get the spot, spotimage, AND review models, because avgRating is the "stars" column from Review table, and
// we need the preview from the spotImage table
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { Sequelize } = require("sequelize");

const router = express.Router();

// Returns all the spots [DONE!]
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
  const formattedSpots = spots.map((spot) => {
    // access the reviews from the spots
    const reviews = spot.Reviews;
    // reduce it to one value, start accumulator at 0
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    // now we divide that value by the amount of reviews we have to get the average
    const avgRating = totalStars / reviews.length;

    // Find the preview image
    const previewImage = spot.SpotImages.find((image) => image.preview);

    // Create a new object with the properties we want
    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating,
      // Ternary -> condition ? <execute if true> : execute if false
      // What it does: shows previewImage unless there's no url, then the value is set to null instead
      previewImage: previewImage ? previewImage.url : null,
    };
  });

  return res.json({ Spots: formattedSpots });
});

// Needs authorization, so we use 'requireAuth' in request below
// Creates and returns a new spot [DONE!]
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

// Requires Authorization
// Create and return a new image for a spot specified by id [DONE!]
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  // find the spot by primary key, if that spot doesn't exist, then throw a 404 error
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
    // request holds the authenticated user's id
    // set that equal to the ownerId of the spot
  } else if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Not authorized!" });
  }
  const imageData = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  // Create a new object with the properties we want (same trick as the first get route)
  const formattedImageData = {
    id: imageData.id,
    url: imageData.url,
    preview: imageData.preview,
  };

  return res.json(formattedImageData);
});

// Requires authorization
// Returns all the spots owned (created) by the current user [DONE!]
router.get("/current", requireAuth, async (req, res) => {
  // Find all the spots owned by the current logged in user
  const spots = await Spot.findAll({
    // get only the spots that the current logged in user has
    where: { ownerId: req.user.id },
    // include the SpotImage and Review model
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
  const formattedSpots = spots.map((spot) => {
    // access the reviews from the spots
    const reviews = spot.Reviews;
    // reduce it to one value, start accumulator at 0
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    // now we divide that value by the amount of reviews we have to get the average
    const avgRating = totalStars / reviews.length;
    // Find the preview image
    const previewImage = spot.SpotImages.find((image) => image.preview);

    // Create a new object with the properties we want
    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating,
      // shows previewImage unless there's no url, then it's set to null instead
      previewImage: previewImage ? previewImage.url : null,
    };
  });

  return res.json({ Spots: formattedSpots });
});

// Returns the details of a spot specified by its id
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  // don't forget await keyword, otherwise we basically always get back an empty {}
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const spotDetails = await Spot.findOne({
    // make sure the spotId matches the id of the Spot we want to get
    where: { id: spotId },
    include: [
      {
        model: SpotImage,
        // when aliasing here, we need to also update the models! here we update the SpotImage model
        as: "SpotImages",
        // attributes are what we include in the results since there are far more columns we could have included
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        // this alias goes in the SPOT MODEL, NOT the User model!!!
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  const reviewData = await Review.findOne({
    where: { spotId },
    // postgres works if we don't use group by and omit a column!
    attributes: [
      // aggregate functions count and avg on their respective columns and then aliased, probably could have not used map
      // on the previous endpoints and just done it this way too lol
      [Sequelize.fn("COUNT", Sequelize.col("id")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
    ],
    // return output of query as a plain object, not Sequelize model instance!  This allows us to merge with the first/main query above
    raw: true,
  });

  // below block of code orders our response the "proper way" with spread
  // convert the "spotDetails" to json, then destructure it to get the column values we want
  // store that in an object "result" then return that as our response at the end
  const { SpotImages, Owner, ...rest } = spotDetails.toJSON();
  const result = {
    ...rest,
    // rest of the query result goes above this, then we put numReviews, followed by avgStarRating, then spotImages, then finally Owner last
    // as we can see in the API docs
    numReviews: reviewData.numReviews,
    avgStarRating: reviewData.avgStarRating,
    SpotImages,
    Owner,
  };

  // note that if we only return "reviewData" we only get the "numReviews" and "avgStarRating" and not the entire response we want
  return res.json(result);
});

module.exports = router;

// // Get all spots (wrong format, also included reviews which wasn't necessary)

// router.get("/", async (req, res) => {
//   const spots = await Spot.findAll({
//     include: [
//       {
//         model: SpotImage,
//       },
//       {
//         model: Review,
//       },
//     ],
//   });

//   // this block of code below gave us the review data with it, which we don't really want
//   // Calculate the average rating for each spot by looping through the spot array we queried above
//   spots.forEach((spot) => {
//     // access the reviews from the spots
//     const reviews = spot.Reviews;
//     // reduce it to one value, start accumulator at 0
//     const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
//     // now we divide that value by the amount of reviews we have to get the average
//     const avgRating = totalStars / reviews.length;
//     // now we alias the value to be 'avgRating'
//     spot.dataValues.avgRating = avgRating;
//   });
//   return res.json(spots);
// });

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

// Works locally, but render hates it

// Returns the details of a spot specified by its id
// router.get("/:spotId", async (req, res) => {
//   const { spotId } = req.params;
//   const spot = await Spot.findByPk(spotId, {
//     attributes: [
//       "id",
//       "ownerId",
//       "address",
//       "city",
//       "state",
//       "country",
//       "lat",
//       "lng",
//       "name",
//       "description",
//       "price",
//       "createdAt",
//       "updatedAt",
//       // aggregate functions to get the values back and alias them as different names
//       // remember to require Sequelize at the top of this file
//       [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
//       [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
//     ],
//     include: [
//       {
//         model: SpotImage,
//         // need to add alias to model TOO!
//         as: "SpotImages",
//         // we only want the following 3 attributes when we get our results back
//         attributes: ["id", "url", "preview"],
//       },
//       {
//         model: User,
//         // need to alias in the SPOT model NOT the User model!
//         as: "Owner",
//         attributes: ["id", "firstName", "lastName"],
//       },
//       {
//         model: Review,
//         attributes: [],
//       },
//     ],
//     group: ["Spot.id"],
//   });

//   if (!spot) {
//     return res.status(404).json({ message: "Spot couldn't be found" });
//   }

//   return res.json(spot);
// })

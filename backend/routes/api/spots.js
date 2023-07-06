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
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const spotDetails = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    attributes: {
      include: [
        // use raw sql below, if Model is "Review", then render wants table names like "reviews"
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM reviews
            WHERE reviews.spotId = Spot.id
          )`),
          "numReviews",
        ],
        [
          Sequelize.literal(`(
            SELECT AVG(stars)
            FROM reviews
            WHERE reviews.spotId = Spot.id
          )`),
          "avgStarRating",
        ],
      ],
    },
  });

  return res.json(spotDetails);
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

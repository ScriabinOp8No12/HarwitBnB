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

// When testing in postman, DO NOT send same request twice, it won't catch the address unique validation error, you must
// use a different address that exists in the database already!
// Updates and returns an existing spot
router.put("/:spotId", requireAuth, async (req, res) => {
  // only owner of spot can make the edit
  // compare the url's spotId with the logged in user (req.user.id) only let them edit if it's the same
  // otherwise throw an error with status code 403
  // also check the spotId against the Spot.findByPK() if it doesn't exist, throw a 404 error, spot not found

  try {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    } else if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    // example in API docs didn't have ownerId in the body... but it definitely needs it
    const {
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

    // use .update() instead of .create() in a put/patch to update record.  .create() is for post requests
    // it's interesting how sqlite3 lets us create a new record in a put request as if it's a post request... (I see the record in my database if I use .create())
    await spot.update({
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

    return res.json(spot);
    // res needs to have: id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, and updatedAt
    // error response 400 given when body has validation errors, this should be setup already! Nope, needs to be a 400 status code
  } catch (err) {
    // check for validation error, if there is, change the response to 400 (otherwise it defaults to 500 status code)
    if (err instanceof Sequelize.ValidationError) {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// need to use .update here instead of .create()

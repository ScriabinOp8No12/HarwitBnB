const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  User,
  Booking,
} = require("../../db/models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

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
    // DO NOT SEND ownerId manually in the req.body
    // ownerId,
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
    // add req.user.id here, not in the body above
    ownerId: req.user.id,
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

    const {
      // ownerId,
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
      // did the same fix here as in the post request
      ownerId: req.user.id,
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

// Deletes an existing spot

router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  } else if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  // use spot.destroy() to remove the spot from the database
  spot.destroy();
  res.json({ message: "Successfully deleted" });
});

// Had to change the MIGRATION and the model because I didn't have the review field not allow null, so now Render needs to have the Schema changed again
// so it can rerun the migrations
// Create and return a new review for a spot specified by id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  try {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    // checking if the Review for the spot already exists given the logged in user
    const existingReview = await Review.findOne({
      // where statement interesting here
      where: { userId: req.user.id, spotId },
    });
    if (existingReview) {
      return res.status(403).json({
        message: "A review already exists for this spot from the current user",
      });
    }

    const { review, stars } = req.body;
    const reviewData = await Review.create({
      userId: req.user.id,
      spotId,
      review,
      stars,
    });

    return res.json({
      id: reviewData.id,
      userId: reviewData.userId,
      spotId: reviewData.spotId,
      review: reviewData.review,
      stars: reviewData.stars,
      createdAt: reviewData.createdAt,
      updatedAt: reviewData.updatedAt,
    });
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Returns all the reviews that belong to a spot specified by id
router.get("/:spotId/reviews", async (req, res) => {
  // this should be "easy" - has two includes from other tables, that's it
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ error: "Spot couldn't be found" });
  }
  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });
  res.json({ Reviews: reviews });
});

// Used Op.or (sequelize or operator here!)
// Create and return a new booking from a spot specified by id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  // needs a try catch block for the 400 validation errors
  // needs the 404 error if spotId doesn't exist
  // check if the user owns the spot they are trying to make the booking on, if so, then throw a 403 error, unauthorized
  // logic, const spot = Spot.findOne(where: {spotId}), then compare req.user.id with spot.ownerId to see if they match
  // use {} = req.body to get the start and end date
  // use .create() method to construct the response body
  // the 403 error is the trickiest, "booking conflict" -> if that place is already booked for that time
  const { startDate, endDate } = req.body;
  const spotId = req.params.spotId;
  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the user owns the spot
    if (req.user.id === spot.ownerId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check for booking conflicts
    const conflicts = await Booking.findOne({
      where: {
        // look for the booking with the spotId in the url
        spotId,
        // Op.or -> logical or statement in sequelize
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });
    if (conflicts) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    // Create the booking
    const booking = await Booking.create({
      spotId,
      userId: req.user.id,
      startDate,
      endDate,
    });

    res.json(booking);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const errors = {};
      // do we need to have the error format look exactly like the API docs?  If so, I'll have to use a forEach loop through all the errors
      // for all the other endpoints
      err.errors.forEach((error) => (errors[error.path] = error.message));
      res.status(400).json({ message: "Validation error", errors });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;

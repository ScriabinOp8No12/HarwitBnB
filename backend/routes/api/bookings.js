const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");

const router = express.Router();

// Return all the bookings that the current user has made
// ISSUE -> Giving null for start and end date ONLY for seeder data......
router.get("/current", requireAuth, async (req, res) => {
  // use where property in findAll() to include only the bookings where
  // req.user.id (current logged in user) equals Booking table's userId (booking.userId)
  // use an include property in the findAll() to also grab data from the Spot table
  // we need to include everything EXCEPT description, which needs
  // to be replaced by previewImage, which is what we've done for the get requests in spots.js
  // we can use the same trick with map, converting it to json, then manipulating it, like in get all reviews by current user!

  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot,
        attributes: [
          // need to exclude the description, so that's why we have to list all the columns out here
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        // same trick as get all reviews by current user, grab the url column from the spotImage model, limit it to the first one we see
        include: [{ model: SpotImage, attributes: ["url"], limit: 1 }],
      },
    ],
  });
  // this console log saved us!
  // console.log("bookings:", bookings);

  // same logic with map to add the url to the booking's query, to get it all in one chunk
  const formattedBookings = bookings.map((booking) => {
    const formattedBooking = booking.toJSON();
    if (formattedBooking.Spot.SpotImages.length > 0) {
      formattedBooking.Spot.previewImage =
        formattedBooking.Spot.SpotImages[0].url;
    }
    delete formattedBooking.Spot.SpotImages;
    return formattedBooking;
  });
  // console.log("formattedBookings:", formattedBookings);

  res.json({ Bookings: formattedBookings });
});
module.exports = router;

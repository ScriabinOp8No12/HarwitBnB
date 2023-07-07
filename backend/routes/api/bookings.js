const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
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

// Update and return an existing booking.

router.put("/:bookingId", requireAuth, async (req, res) => {
  // Plan: get the bookingId from the url
  // if req.user.id not equal to Booking.findByPk(bookingId)
  // check logged in user (req.user.id) against the booking.userId (use Booking.findOne(where: {bookingId}))
  // compare req.user.id with booking.userId, if not the same, throw a 403 not authorized error
  // destructure the res.body, then use .update() method on the booking, like booking.update()
  // pass in id, userId, spotId, startDate, endDate, createdAt, updatedAt
  // tricky/different part: need an if condition checking if the req.body's endDate
  // is past current date right now (using new Date()?)
  // also throw a 403 error (if block) check if start or end date in the req.body are between (use Op.between)
  // the booking's start/end date in the database
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }
  if (req.user.id !== booking.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  if (new Date(endDate) < new Date()) {
    return res.status(400).json({ message: "Past bookings can't be modified" });
  }
  const conflictingBooking = await Booking.findOne({
    where: {
      spotId: booking.spotId,
      // Op.ne means 'not equal'
      id: { [Op.ne]: bookingId },
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
      ],
    },
  });
  if (conflictingBooking) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
    });
  }
  await booking.update({ startDate, endDate });
  return res.json({
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  });
});

module.exports = router;

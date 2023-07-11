const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const router = express.Router();

// Return all the bookings that the current user has made
// ISSUE SOLVED -> Was giving null for start and end date ONLY for seeder data......
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
  // this console log saved us! our formatting for the dates in the seeder data needed a bunch of extra digits to specify the exact time, not just the day/date
  // console.log("bookings:", bookings);

  // same logic with map to add the url to the booking's query, to get it all in one chunk
  const formattedBookings = bookings.map((booking) => {
    const formattedBooking = booking.toJSON();
    if (formattedBooking.Spot.SpotImages.length > 0) {
      formattedBooking.Spot.previewImage =
        formattedBooking.Spot.SpotImages[0].url;
    }
    // again, we don't want the SpotImage appearing in our output
    delete formattedBooking.Spot.SpotImages;
    // convert teh following lat, lng, and price to numbers before returning
    formattedBooking.Spot.lat = Number(formattedBooking.Spot.lat);
    formattedBooking.Spot.lng = Number(formattedBooking.Spot.lng);
    formattedBooking.Spot.price = Number(formattedBooking.Spot.price);
    return formattedBooking;
  });
  // console.log("formattedBookings:", formattedBookings);
  // added return here
  return res.json({ Bookings: formattedBookings });
});

// Update and return an existing booking
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
  // compare endDate in req.body with current date
  if (new Date(endDate) < new Date()) {
    return res.status(400).json({ message: "Past bookings can't be modified" });
  }
  const conflictingBooking = await Booking.findOne({
    where: {
      spotId: booking.spotId,
      // Op.ne means 'not equal'
      // this block is handling "conflictingBookings"
      id: { [Op.ne]: bookingId },
      [Op.or]: [
        // use between operator
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

// Delete an existing booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  // Plan: This one needs an extra if block, with two conditions in it, to check if the owner is either the booking owner or the spot owner
  // because that's the only condition in which they are authorized to delete the booking
  const { bookingId } = req.params;
  // we need to include the Spot model here so we can check if the booking.Spot.ownerId exists
  const booking = await Booking.findByPk(bookingId, {
    include: { model: Spot, attributes: ["ownerId"] },
  });
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }
  // here, we have to check both if the user isn't the booking owner nor the spot owner, then they aren't authorized!
  if (req.user.id !== booking.userId && req.user.id !== booking.Spot.ownerId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  // if the booking start date is before the current date, that means the booking already started, so throw a 403 error
  // but how do we check this in postman?  since we can't create a booking that is before today, don't we have to wait at least a day to verify our code works? lol
  if (new Date(booking.startDate) < new Date()) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }
  // is it proper to use await keyword here?
  await booking.destroy();
  return res.json({ message: "Successfully deleted" });
});

module.exports = router;

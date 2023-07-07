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

const router = express.Router();

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
  // this else if might not be right either, changed from reviewId to review.userId
  else if (req.user.id !== review.userId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  // this is the block that's tricky -> I need to count the number of "urls" that
  // are tied to the current review, somehow got it first try by following this aa open page:
  // https://open.appacademy.io/learn/js-py---pt-jan-2023-online/week-22---express-and-sequelize-pt--ii/aggregate-data
  const countReviews = await ReviewImage.count({
    where: { reviewId },
  });
  if (countReviews >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }
  const reviewImage = await ReviewImage.create({
    // reviewId can't be null
    reviewId,
    url,
  });
  // we only want to return the id and url, not the created/updated at and the reviewId
  res.json({ id: reviewImage.id, url: reviewImage.url });
});

module.exports = router;

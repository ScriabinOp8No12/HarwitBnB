const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { ReviewImage, Review } = require("../../db/models");

const router = express.Router();

// Delete an existing image for a Review (deletes by id column in ReviewImages)
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const reviewImage = await ReviewImage.findByPk(imageId);
  if (!reviewImage) {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  }
  // we find the reviewImage's reviewId to get the exact review we are referring to
  // then we can check the logged in user's id against the userId column of the review to see if they match
  const review = await Review.findByPk(reviewImage.reviewId);

  if (req.user.id !== review.userId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  // DESTROYYY
  reviewImage.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;

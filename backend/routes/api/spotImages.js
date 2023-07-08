const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { SpotImage, Spot } = require("../../db/models");

const router = express.Router();

// Delete an existing image for a Spot
router.delete("/:imageId", requireAuth, async (req, res) => {
  // basically same code as delete a review image
  const { imageId } = req.params;
  const spotImage = await SpotImage.findByPk(imageId);
  if (!spotImage) {
    return res.status(404).json({ message: "Spot Image couldn't be found" });
  }
  const spot = await Spot.findByPk(spotImage.spotId);
  // compare logged in user with the "user" aka ownerId of the spot
  if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  spotImage.destroy();
  // added return below
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;

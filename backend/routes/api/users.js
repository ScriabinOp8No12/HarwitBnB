const express = require("express");

const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more.")
    // stop password from only containing spaces
    .custom((value) => {
      if (!value.trim()) {
        // If after trimming, the password is empty, that means it was only spaces.
        throw new Error("Password cannot be only spaces.");
      }
      return true; // Indicates the success of this synchronous custom validator
    }),
  handleValidationErrors,
];
// Sign up
router.post("/", validateSignup, async (req, res) => {
  // adding first and last name here into the req.body and in the .create method below
  const { firstName, lastName, email, password, username } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    // needed first and last name here too!
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    // added first and last name to POST request
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;

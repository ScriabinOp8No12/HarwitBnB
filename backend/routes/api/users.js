const express = require("express");
const bcrypt = require("bcryptjs");
const { validateSignup } = require("../../utils/validateErrors");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    errors: validationErrors,
  } = req.body;

  console.log("Validation Errors:", validationErrors); // Debugging line

  const hashedPassword = bcrypt.hashSync(password);
  const nullUserDefaultScopt = User.scope(null);
  const allUsers = await nullUserDefaultScopt.findAll();

  const errors = { ...validationErrors };

  allUsers.forEach((user) => {
    const { username: existingUsername, email: existingEmail } = user.toJSON();

    if (existingUsername === username && !errors.username) {
      errors.username = "User with that username already exists";
    }

    if (existingEmail === email && !errors.email) {
      errors.email = "User with that email already exists";
    }
  });

  console.log("Merged Errors:", errors); // Debugging line

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "User already exists", errors });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
});

module.exports = router;

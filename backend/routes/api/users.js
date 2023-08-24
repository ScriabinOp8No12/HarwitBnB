const express = require("express");
const bcrypt = require("bcryptjs");
const { validateSignup } = require("../../utils/validateErrors");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const nullUserDefaultScopt = User.scope(null);

  const allUsers = await nullUserDefaultScopt.findAll();

  const usersList = [];

  allUsers.forEach((users) => {
    usersList.push(users.toJSON());
  });
  usersList.forEach((user) => {
    const { username, email } = user;

    if (username === req.body.username)
      res.status(500).json({
        message: "User already exists",
        errors: { username: "User with that username already exists" },
      });

    if (email === req.body.email)
      res.status(500).json({
        message: "User already exists",
        errors: { email: "User with that email already exists" },
      });
  });

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

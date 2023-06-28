// const router = require("express").Router();

// Test this in the browser at: http://localhost:8000/api/csrf/restore
// fetch("/api/test", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `44MyvdFw-jZf5SmTaxsyQE-1ooBKScXruaPE`,
//   },
//   body: JSON.stringify({ hello: "world" }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// TEST USER AUTH MIDDLEWARES ROUTE
// GET /api/set-token-cookie
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// TEST RESTORE USER MIDDLEWARE ROUTE

// GET /api/restore-user
// const { restoreUser } = require("../../utils/auth.js");

// router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// TESTING REQUIRE-AUTH

// router.use(restoreUser);

// GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

// module.exports = router;
// -----------------

const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;

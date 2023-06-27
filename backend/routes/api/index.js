const router = require("express").Router();

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

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;

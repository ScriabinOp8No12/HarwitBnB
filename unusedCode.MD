// // Get all spots (wrong format, also included reviews which wasn't necessary)

// router.get("/", async (req, res) => {
// const spots = await Spot.findAll({
// include: [
// {
// model: SpotImage,
// },
// {
// model: Review,
// },
// ],
// });

// // this block of code below gave us the review data with it, which we don't really want
// // Calculate the average rating for each spot by looping through the spot array we queried above
// spots.forEach((spot) => {
// // access the reviews from the spots
// const reviews = spot.Reviews;
// // reduce it to one value, start accumulator at 0
// const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
// // now we divide that value by the amount of reviews we have to get the average
// const avgRating = totalStars / reviews.length;
// // now we alias the value to be 'avgRating'
// spot.dataValues.avgRating = avgRating;
// });
// return res.json(spots);
// });

// using map below worked well for the other get endpoint -> see .get("/current")
// Calculate the average rating for each spot without including the review in the response
// const spotsWithAvgRating = spots.map((spot) => {
// // access the reviews from the spots
// const reviews = spot.Reviews;
// // reduce it to one value, start accumulator at 0
// const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
// // now we divide that value by the amount of reviews we have to get the average
// const avgRating = totalStars / reviews.length;
// // Create a new object with the spot data and the calculated average rating
// return { ...spot.dataValues, avgRating };
// });

// return res.json(spotsWithAvgRating);
// });

// Works locally, but render hates it

// Returns the details of a spot specified by its id
// router.get("/:spotId", async (req, res) => {
// const { spotId } = req.params;
// const spot = await Spot.findByPk(spotId, {
// attributes: [
// "id",
// "ownerId",
// "address",
// "city",
// "state",
// "country",
// "lat",
// "lng",
// "name",
// "description",
// "price",
// "createdAt",
// "updatedAt",
// // aggregate functions to get the values back and alias them as different names
// // remember to require Sequelize at the top of this file
// [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
// [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
// ],
// include: [
// {
// model: SpotImage,
// // need to add alias to model TOO!
// as: "SpotImages",
// // we only want the following 3 attributes when we get our results back
// attributes: ["id", "url", "preview"],
// },
// {
// model: User,
// // need to alias in the SPOT model NOT the User model!
// as: "Owner",
// attributes: ["id", "firstName", "lastName"],
// },
// {
// model: Review,
// attributes: [],
// },
// ],
// group: ["Spot.id"],
// });

// if (!spot) {
// return res.status(404).json({ message: "Spot couldn't be found" });
// }

// return res.json(spot);
// })

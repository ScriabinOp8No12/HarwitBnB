Challenges / Problems

1. Aggregate functions gave me a lot of trouble, because it would work locally using sqlite3, but fail in production mode when using the stricter Postgres. Using group by and omitting columns of associated models was allowed in sqlite3 locally, but Postgres/Render was really upset and didn't allow it. Unfortunately, if we include the associated models, we get extra data in our response which is not what we want.
   I tried using raw SQL instead, but Postgres is strict with naming and capitalization, and it couldn't find my Reviews table, regardless of my naming convention on it

Solution: Used a separate query instead of a subquery attached to the main query, and used sequelize.fn for aggregates along with aliases and using the raw propery to convert the output from a Sequelize model instance to a plain object. See example below:

const reviewData = await Review.findOne({
where: { spotId },
attributes: [
// aggregate functions count and avg on their respective columns and then aliased
[Sequelize.fn("COUNT", Sequelize.col("id")), "numReviews"],
[Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
],
// return output of query as a plain object, not Sequelize model instance! This allows us to merge with the first/main query above
raw: true,
});

2. Deploying changes to Render was working until I started deploying the migrations and seeders. Everything worked locally, I could run and undo the migrations and seeders. The issue in the migrations was I needed to include the options object (for production mode), but the build command on Render didn't run the undo on the migrations/seeders, and so no matter how much I updated my migrations/seeders (to include the options object), it would keep throwing the "build failed" error. The options object was properly added to the migrations/seeders, but the build still failed, it was another classic "behavior' issue. I thought the issue was with my code, but no, it was actually with the build command on render.

Unfortunately, changing our build commands to include the undo migration and undo seed command doesn't work because the syntax we learned in class isn't proper syntax in Postgres.

Solution: Change the SCHEMA within the environment variable on Render to anything different. This likely ran a drop table command so Render was forced to rerun my migrations and seeders to recreate the tables/database, this worked!

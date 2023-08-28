Challenges / Problems

Main takeaway:

console.log more if I run into something that has weird behavior.
This helps isolate the problem, which makes solving it a lot easier.

Some examples of when I used console logging, or tried to isolate the problem. For example, when deploying to Render, once
I knew it was working locally, but wasn't working on Render, I carefully read the error logs, and asked for help. The problem was the migration wasn't rerunning after I modified the migrations to include an options object for being used in production. So the Render build kept failing.

Another example was when running certain get requests in postman, some of the data had a "null" value showing up for the date. I isolated the problem and realized it was only for the seeder data, but when I looked at the seeder data, there were values for the dates. So then I did some console logging in the get request, and realized that the terminal showed that the dates were invalid, since they were missing the 9-10 digit number following the day/week/month to specify the TIME. Once I added the numbers in, the null values disappeared from the query!

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

3. My date string in the seeder data for the bookings was in an invalid format, but sqlite3 wouldn't throw an error, and displays it properly when I use raw sql in the terminal / command line, however postman kept saying the seed data had a null value. However, if I manually add the data using the post request I made earlier, the booking would show up properly with no null values for the start and end date!

Solution: console logging in the endpoint after the .findAll() method showed "invalid date" in the terminal. That meant the seeder data was the culprit! Other than deleting our database and remigrating then reseeding, is there another way to do it? I could not successfully undo my seeders and rerun them, maybe it was because I updated them before I tried to undo them?

Here's what the format had to be changed to:

{
spotId: 1,
userId: 1,
// Seeder data date can NOT be how it looks below
// startDate: "2034-01-01",
// needs to be like below!
startDate: "2034-01-01 00:00:00.000",
endDate: "2035-01-01 00:00:00.000",
createdAt: new Date(),
updatedAt: new Date(),
},

4. I was using the alias on the wrong model, needed to make the alias on the Spot model to change it to "Owner" from "User", but I was making the alias on the User model, trying to make it "Owner"

--------------- FRONTEND PROBLEMS ---------------------

1. Spent 2.5 hours on a media query to realize I needed an extra line in my index.html for the media queries to apply, the problem was tricky because it seemed like the media query was half working because it would reduce the images from 4 to 3 at a certain breakpoint

2. Spent 2.5 hours not getting the data from the backend, realized I forgot to use CSRF, even though the copy paste class code used the csrf function

3. Spent 2 hours not being able to update the state of the page, it was largely because it would sometimes throw a "can't read properites of undefined, reading "firstName" which was causing a cascading problem. Needed to add a small || [] to the end of a conditional

4. Spent 45 minutes on an infinite loop in the browser, with a very undescriptive error says can't get data / object something something, turns out my route order was wrong, needed to put /spots/current above /spots

5. Spent 30 minutes on css not styling something, it was tricky because I was using the same css classnames for the home page spots and the /spots/current manage spots page so that it was consistent, I commented out the import css statement in my code to try to isolate a problem regarding not fetching /spots/current properly, but the page was still styled like the main page, so I thought the css was working. It turns out because of the same class names, it was styling them properly, but the h1 wasn't affected because I commented out the import statement in my css.

6. 1 hour spent on a fun bug. The update spot form would only work if there was at least one review for that spot, but it would always say the error "avgStarRating is required", and "numReviews is required" even though we don't pass those in into the request body. Postman request works with just the smaller amount of fields. It was tricky to get the console log to show up in the browser, but after that, I figured out that when we had at least 1 review for the spot, the dispatch was also dispatching numReviews and avgStarRating, which meant we just had to check to see if those were undefined before dispatching. If they were undefined, then don't throw the error, however this didn't work, on closer inspection, it turns out the numReviews and avgStarRating are both set to 0 before the dispatch if there are no reviews or avgStarRating. There was another check that had to be done to check that the spotDetails Object value was either undefined or null as well.

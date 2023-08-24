// Define all the validation / error catching logic here

const { check, query } = require("express-validator");
const { handleValidationErrors } = require("./validation");

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Reused requiredfield logic, can't allow it to be empty,
// either blank string or series of empty strings,
const requiredField = (field, type = "String") =>
  [
    check(field)
      .exists({ checkFalsy: true })
      .withMessage(capitalizeFirstLetter(`${field} is required`))
      .notEmpty()
      .withMessage(capitalizeFirstLetter(`${field} is required`))
      .custom((value) => {
        if (value.trim().length === 0) {
          throw new Error(capitalizeFirstLetter(`${field} is required`));
        }
        return true;
      }),
    type === "String"
      ? check(field)
          .isString()
          .withMessage(capitalizeFirstLetter(`${field} is required`))
      : null,
  ].filter(Boolean);

// Require username and password for login
const validateLogin = [
  ...requiredField("credential"),
  ...requiredField("password"),
  handleValidationErrors,
];

// Specific error messages for signup
const validateSignup = [
  ...requiredField("email"),
  check("email").isEmail().withMessage("Invalid email"),
  ...requiredField("username"),
  check("username")
    .isAlphanumeric()
    .withMessage("Username is required")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  ...requiredField("password"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  // Force user's first and lastname to only be strings, no numbers allowed
  ...requiredField("firstName", "String"),
  ...requiredField("lastName", "String"),
  handleValidationErrors,
];

// Address amd city are required fields,
const validateSpot = [
  ...requiredField("address"),
  ...requiredField("city"),
  check("city")
    .not()
    .isNumeric()
    .matches(/^[a-z\s]*$/i),
  ...requiredField("state"),
  check("state")
    .not()
    .isNumeric()
    .matches(/^[a-z\s]*$/i),
  ...requiredField("country"),
  check("country").not().isNumeric(),
  ...requiredField("lat", "Float"),
  check("lat").isDecimal().isFloat().isNumeric().not().isString().not().isInt(),
  ...requiredField("lng", "Float"),
  check("lng").isDecimal().isFloat().isNumeric().not().isString().not().isInt(),
  ...requiredField("name"),
  check("name")
    .isLength({ max: 50 })
    .matches(/^[\w\-\s]+$/),
  ...requiredField("description"),
  ...requiredField("price", "Int"),
  check("price").isNumeric().isInt({ min: 0 }).not().isString(),
  handleValidationErrors,
];

const validateReview = [
  ...requiredField("review"),
  // Stars field must be an Int
  ...requiredField("stars", "Int"),
  check("stars").isNumeric().isInt().not().isString().isIn([1, 2, 3, 4, 5]),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate").custom((value, { req }) => {
    if (value >= req.body.endDate) {
      throw new Error("startDate cannot be on or after endDate");
    }
    return true;
  }),
  check("endDate").custom((value, { req }) => {
    if (value <= req.body.startDate) {
      throw new Error("endDate cannot be on or before startDate");
    }
    return true;
  }),
  // Date entered into booking request body must be in the following format
  check("startDate").isDate({ format: "YYYY-MM-DD" }),
  check("endDate").isDate({ format: "YYYY-MM-DD" }),
  handleValidationErrors,
];

// Query parameter
const validateQueryParameter = [
  query("page").optional().isInt({ min: 1 }).not().isAlpha(),
  query("size").optional().isInt({ min: 1 }).not().isAlpha(),
  query("maxLat").optional().isFloat({ min: -190, max: 190 }).not().isAlpha(),
  query("minLat").optional().isFloat({ min: -190, max: 190 }).not().isAlpha(),
  query("maxLng").optional().isFloat({ min: -190, max: 190 }).not().isAlpha(),
  query("minLng").optional().isFloat({ min: -190, max: 190 }).not().isAlpha(),
  query("minPrice").optional().isInt({ min: 0 }).not().isAlpha(),
  query("maxPrice").optional().isInt({ min: 0 }).not().isAlpha(),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateSignup,
  validateSpot,
  validateReview,
  validateBooking,
  validateQueryParameter,
};

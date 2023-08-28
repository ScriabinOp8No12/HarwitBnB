const { validationResult } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => {
      if (error.path) {
        // Change this line from error.param to error.path
        errors[error.path] = error.msg;
      } else {
        console.error("Undefined error path:", error);
      }
    });
    req.body.errors = errors;
  }
  next();
};

module.exports = {
  handleValidationErrors,
};

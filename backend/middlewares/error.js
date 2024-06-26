const Errorhandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error!";

  //wrong mongodb id
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  //Mongoose Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`;
    err = new Errorhandler(message, 400);
  }

  //JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid JWT!`;
    err = new Errorhandler(message, 400);
  }

  //JWT expiry Error
  if (err.code === "TokenExpiredError") {
    const message = `Token Expired, Try again!`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

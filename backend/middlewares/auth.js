const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhandler("Please Login to continue!", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    return next(new Errorhandler("Invalid token!", 401));
  }
  req.user = await User.findById(decodedData.id);
  if (!req.user) {
    return next(new Errorhandler("Invalid user! or User not Found!", 401));
  }
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role ${req.user.role} is not allowed to access this resource!`,
          403
        )
      );
    }
    next();
  };
};

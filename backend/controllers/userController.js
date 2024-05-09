const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: "sample _id",
      url: "image url",
    },
  });
  await user.save();
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Enter email and password", 401));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  const pass = user.comparePassword(password);
  if (!pass) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

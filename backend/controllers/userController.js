const crypto = require("crypto");
const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");

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
  const pass = await user.comparePassword(password);
  if (!pass) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out!",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }
  const resetPassToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPassUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetPassToken}`;
  // const message = `Your password reset url is : ${resetPassUrl}`;
  const message = `Your password reset token is :- \n\n ${resetPassUrl} \n\n If you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Reset!",
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPassToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPassToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new Errorhandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.getAllUserAdmin = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetailAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new Errorhandler(`User of id:${req.params.id} not found!`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.userDeleteAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new Errorhandler(`User of id:${req.params.id} not found!`, 404)
    );
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully!",
  });
});

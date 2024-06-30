const Product = require("../models/productModels");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Apifeature = require("../utils/apifeatures");

//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

//Get all Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  let resultPerPage = 5;
  const countProduct = await Product.countDocuments();
  const apiFeature = new Apifeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeature.query;
  res.status(200).json({ success: true, countProduct, product });
});

//Get Product details
exports.getProduct = catchAsyncError(async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  res.status(200).json({ success: true, product });
});

//Get update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, product });
});

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() == req.user._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() == req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

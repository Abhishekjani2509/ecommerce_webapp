const Product = require("../models/productModels");
const Errorhandler = require("../utils/errorhandler");

//create product
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
};

//Get all Products
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({ success: true, product });
};

//Get Product details
exports.getProduct = async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  res.status(200).json({ success: true, product });
};

//Get update Product
exports.updateProduct = async (req, res, next) => {
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
};

//Delete Product
exports.deleteProduct = async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Not Found!", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, product });
};

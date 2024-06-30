const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/products").get(getAllProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;

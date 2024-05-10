const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/products").get(getAllProducts);
router
  .route("/product/:id")
  .get(getProduct)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/products").get();
router.route("/product/:id").get().put().delete();

module.exports = router;

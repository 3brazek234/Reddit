const express = require("express");
require("dotenv").config();
const authController = require("../controllers/authController");
const { signupSchema, loginSchema } = require("../validtion/schemas");
const validateRequest = require("../middlewares/validator");

const router = express.Router();
router.post(
  "/signup",
  validateRequest(signupSchema, "body"),
  authController.signup
);
router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.login
);
router.get("/user/:id", authController.getUser);
module.exports = router;

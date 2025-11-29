const express = require("express");
const validate = require("../middlewares/validator");
const { createSubreddit } = require("../validtion/schemas");
const auth = require("../middlewares/auth");
const createSubreddit = require("../controllers/subredditController");
const router = express.Router();
router.post(
  "/create-reddit",
  validate(createSubreddit, "body"),
  auth,
  createSubreddit
);
module.export = router;

// src/routes/uploadRoute.js
const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const multer = require("multer");
const auth = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/media/:id",

  upload.single("image"),
  mediaController.uploadMedia
);
module.exports = router;

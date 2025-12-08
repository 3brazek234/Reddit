// src/controllers/mediaController.js
const axios = require("axios");
const FormData = require("form-data");
const { userClient } = require("../grpcClient");
const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const id = req.params.id;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const uploading = await axios.post(
      "http://localhost:3005/upload",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    console.log(uploading);
    const imageUrl = uploading.data.data.url;
    console.log("Image uploaded to Media Service:", imageUrl);
    userClient.updatePicture(
      { userid: Number(id), img: imageUrl },
      (error, response) => {
        if (error) {
          console.error("gRPC Error while updating user image:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to update user image",
          });
        }
        res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          data: response,
        });
      }
    );
  } catch (error) {
    console.error("Upload Error Details:", error.message);
    if (error.response) {
      console.error("Response form Media Service:", error.response.data);
    }

    res.status(500).json({ error: "Failed to upload file" });
  }
};

module.exports = {
  uploadMedia,
};

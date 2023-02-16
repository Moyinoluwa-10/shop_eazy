const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = require("../config/config");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "src/uploads/" });

const fileUploadRouter = express.Router();

const FileUploadController = async (req, res) => {
  try {
    console.log("req.file", req.file);
    const filepath = req.file.path;
    console.log("filepath", filepath);

    // upload to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filepath, {
      folder: "shop_easy",
    });

    // delete file
    fs.unlink(filepath, (err) => {
      if (err) return;
    });

    return res.status(200).json({
      message: "File uploaded",
      status: true,
      url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    // logger.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

fileUploadRouter.post(
  "/file/upload",
  upload.single("avatar"),
  FileUploadController
);

module.exports = fileUploadRouter;

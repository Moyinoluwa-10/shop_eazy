const fs = require("fs");
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

const fileUploadController = async (req, res, next) => {
  try {
    if (req.file) {
      const filepath = req.file.path;

      // upload to cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(filepath, {
        folder: "shop_easy",
      });

      // delete file
      fs.unlink(filepath, (err) => {
        if (err) return;
      });

      req.body.image = cloudinaryResponse.secure_url;

      req.body = JSON.parse(JSON.stringify(req.body));
      next();
    }

    next();
  } catch (error) {
    error.source = "image conversion";
    next(error);
  }
};

module.exports = fileUploadController;

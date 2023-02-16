require("dotenv").config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI =
  NODE_ENV === "TEST" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRY_TIME = process.env.EXPIRY_TIME;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  EXPIRY_TIME,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};

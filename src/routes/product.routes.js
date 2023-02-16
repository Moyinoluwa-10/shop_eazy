const express = require("express");
const multer = require("multer");
const fileUploadController = require("../controllers/file.controller");
const router = express.Router();
const {
  getAllProducts,
  getProductByID,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const {
  addProductValidationMW,
  updateProductValidationMW,
} = require("../validators/product.validator");

const upload = multer({ dest: "src/uploads/" });

router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post(
  "/",
  upload.single("image"),
  fileUploadController,
  addProductValidationMW,
  createProduct
);
router.patch("/:id", updateProductValidationMW, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

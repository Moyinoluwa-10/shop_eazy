const express = require("express");
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

router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post("/", addProductValidationMW, createProduct);
router.patch("/:id", updateProductValidationMW, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

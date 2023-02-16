const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

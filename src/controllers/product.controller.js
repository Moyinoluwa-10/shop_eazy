const productModel = require("../models/product.model");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    return res.status(200).json({ status: true, products });
  } catch (error) {
    error.source = "get all products controller";
    next(error);
  }
};

const getProductByID = async (req, res, next) => {
  try {
    const ID = req.params.id;
    const products = await productModel.findOne({ _id: ID });
    return res.status(200).json({ status: true, products });
  } catch (error) {
    error.source = "get product by id controller";
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const product = await productModel.create(body);
    return res.status(201).json({ status: true, product });
  } catch (error) {
    error.source = "create product controller";
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const ID = req.params.id;
    const product = await productModel.findOne({ _id: ID });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(ID, body, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Product updated sucessfully",
      product: product,
    });
  } catch (error) {
    error.source = "update product controller";
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // const ID = req.params.id;
    // const product = await productModel.findOne({ _id: ID });

    // if (!product) {
    //   return res
    //     .status(404)
    //     .json({ status: false, message: "Product not found" });
    // }

    const updatedProduct = await productModel.deleteMany({
      category: "drinks",
    });

    return res.status(200).json({
      status: true,
      message: "Product deleted sucessfully",
      product: updatedProduct,
    });
  } catch (error) {
    error.source = "delete product controller";
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};

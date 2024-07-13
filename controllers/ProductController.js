const ApiError = require("../utils/ApiError");
const { Product, Category } = require("../models");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Category });

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    if (!product) {
      return next(new ApiError("Product not found"));
    }

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const [product] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (!product) {
      return next(new ApiError("Product not found"));
    }

    const updatedProduct = await Product.findOne({ where: { id: product } });

    res.status(200).json({
      status: "success",
      product: updatedProduct,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });

    if (!product) {
      return next(new ApiError("Product not found"));
    }

    res.status(200).json({
      status: "success",
      product: "Product deleted successfully.",
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

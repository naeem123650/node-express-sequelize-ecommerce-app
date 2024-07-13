const { Category, Product } = require("../models");
const ApiError = require("../utils/ApiError");

const getAllCategories = async (req, res, next) => {
  const categories = await Category.findAll({
    include: Product,
  });

  res.status(200).json({
    status: "success",
    categories,
  });
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });

    if (!category) {
      return next(new ApiError("Category not found.", 404));
    }

    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {
    return next(new ApiError(error?.message));
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    return next(new ApiError(error?.message));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const [category] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!category) {
      next(new ApiError("Category not found.", 404));
    }

    const updatedCategory = await Category.findOne({
      where: { id: category },
    });

    res.status(200).json({
      status: "success",
      category: updatedCategory,
    });
  } catch (error) {
    return next(new ApiError(error?.message));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });

    if (!category) {
      return next(new ApiError("Category not found.", 404));
    }

    res.status(204).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    return next(new ApiError(error?.message));
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

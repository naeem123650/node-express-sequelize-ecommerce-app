const ApiError = require("../utils/ApiError");
const { Review, User } = require("../models");

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: { model: User } });

    res.status(200).json({
      status: "success",
      reviews,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ where: { id: req.params.id } });

    if (!review) {
      return next(new ApiError("Review not found.", 404));
    }

    res.status(200).json({
      status: "success",
      review,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      status: "success",
      review,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const updateReview = async (req, res, next) => {
  try {
    const [review] = await Review.update(req.body, {
      where: { id: req.params.id },
    });

    if (!review) {
      return next(new ApiError("Review not found.", 404));
    }

    const updatedReview = await Review.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      review: updatedReview,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.destroy({ where: { id: req.params.id } });

    if (review) {
      return next(new ApiError("Review not found.", 404));
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

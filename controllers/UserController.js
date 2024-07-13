const ApiError = require("../utils/ApiError");
const { User, Order } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.scope("withPassword").findAll({
      include: {
        model: Order,
      },
    });

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.scope("withPassword").findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return next(new ApiError("User not found.", 404));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const updateUser = async (req, res, next) => {
  try {
    const [user] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (!user) {
      return next(new ApiError("User not found.", 404));
    }

    const updatedUser = await User.findOne({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });

    if (!user) {
      return next(new ApiError("User not found.", 404));
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

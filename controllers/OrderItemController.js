const ApiError = require("../utils/ApiError");
const { OrderItem, Order } = require("../models");

const getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({ include: { model: Order } });

    res.status(200).json({
      status: "success",
      orderItems,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const getOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findOne({ where: { id: req.params.id } });

    if (!orderItem) {
      return next(new ApiError("OrderItem not found.", 404));
    }

    res.status(200).json({
      status: "success",
      orderItem,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const createOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body);

    res.status(201).json({
      status: "success",
      orderItem,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const updateOrderItem = async (req, res, next) => {
  try {
    const [orderItem] = await OrderItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (!orderItem) {
      return next(new ApiError("OrderItem not found.", 404));
    }

    const updatedOrderItem = await OrderItem.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      orderItem: updatedOrderItem,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const deleteOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.destroy({ where: { id: req.params.id } });

    if (!orderItem) {
      return next(new ApiError("OrderItem not found.", 404));
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};

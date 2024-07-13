const ApiError = require("../utils/ApiError");
const { Order, User, OrderItem } = require("../models");

const getAllOrders = async (req, res, next) => {
  const { include } = req.query;

  const includeOptions = [];

  if (include) {
    const includeParam = include.split(",");

    if (includeParam.includes("user")) {
      includeOptions.push({ model: User });
    }

    if (includeParam.includes("orderitems")) {
      includeOptions.push({ model: OrderItem });
    }
  }

  const orders = await Order.findAll({
    include: includeOptions,
    where: {
      id: req.user.id,
    },
  });

  return res.status(200).json({
    status: "success",
    orders,
  });
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.id } });

    if (!order) {
      return next(new ApiError("Order not found.", 404));
    }

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      status: "success",
      order,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const updateOrder = async (req, res, next) => {
  try {
    console.log(req.body);

    const [order] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (!order) {
      return next(new ApiError("Order not found.", 404));
    }

    const updatedOrder = await Order.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      order: updatedOrder,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.destroy({ where: { id: req.params.id } });

    if (!order) {
      return next(new ApiError("Order not found.", 404));
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

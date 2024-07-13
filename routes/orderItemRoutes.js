const express = require("express");

const {
  getAllOrderItems,
  createOrderItem,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/OrderItemController");

const router = express.Router();

router.route("/").get(getAllOrderItems).post(createOrderItem);

router
  .route("/:id")
  .get(getOrderItem)
  .put(updateOrderItem)
  .delete(deleteOrderItem);

module.exports = router;

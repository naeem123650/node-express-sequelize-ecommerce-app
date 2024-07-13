const express = require("express");

const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/OrderController");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

router.route("/").get(auth, getAllOrders).post(createOrder);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;

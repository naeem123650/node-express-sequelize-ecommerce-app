const express = require("express");
const {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/ReviewController");

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;

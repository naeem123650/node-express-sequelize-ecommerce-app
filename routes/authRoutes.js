const express = require("express");
const { register, me, login } = require("../controllers/authController");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;

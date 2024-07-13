const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const AsyncHandler = require("../utils/AsyncHandler");
require("dotenv").config(`${__dirname}/../.env`);

module.exports = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ where: { id: decoded.id } });

    next();
  }

  if (!token) {
    res.status(401);
    throw next(new ApiError("Not authorized, no token", 401));
  }
});

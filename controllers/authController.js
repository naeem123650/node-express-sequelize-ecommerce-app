const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AsyncHandler = require("../utils/AsyncHandler");
require("dotenv").config(`${__dirname}/../.env`);

const register = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    throw next(new ApiError("User already registered", 400));
  }

  const hashedPassword = await getHashedPassword(password);

  const user = await User.scope("withPassword").create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user.id),
    },
  });
});

const getHashedPassword = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.scope("withPassword").findOne({
    where: { email: email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user.id),
      },
    });
  } else {
    next(new ApiError("User does not exist.", 400));
  }
});

const me = AsyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: req.user,
  });
});

module.exports = {
  register,
  login,
  me,
};

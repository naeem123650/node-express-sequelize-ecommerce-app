const express = require("express");
require("dotenv").config();

const CategoryRoutes = require("./routes/categoryRoutes");
const ProductRoutes = require("./routes/productRoutes");
const UserRoutes = require("./routes/userRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const OrderItemRoutes = require("./routes/orderItemRoutes");
const ReviewRoutes = require("./routes/reviewRoutes");
const AuthRoutes = require("./routes/authRoutes");

const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./utils/ErrorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/order-items", OrderItemRoutes);
app.use("/api/reviews", ReviewRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError("Route not defined", 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`);
});

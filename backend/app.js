const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");



// cho phép máy chủ này kết lấy dữ liệu từ phía server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));  

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname,"./uploads")));


app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const order = require("./controller/order");
const message = require("./controller/message");
const conversation = require("./controller/conversation");
// const payment = require("./controller/payment");
// const shop = require("./controller/shop");
// const withdraw = require("./controller/withdraw");
const admin = require("./controller/admin");

app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/user", user);
app.use("/api/v2/order", order);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/admin", admin);

// app.use("/api/v2/shop", shop);
// app.use("/api/v2/payment", payment);
// app.use("/api/v2/withdraw", withdraw);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
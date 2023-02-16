const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const fileRouter = require("./routes/file.routes");
const httpLogger = require("./logging/httpLogger");

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(httpLogger);

app.use("/", userRouter);
app.use("/", fileRouter);
app.use("/api/v0/product", productRouter);

// Home Route
app.get("/", (req, res) => {
  return res.status(200).send({
    status: true,
    message: "Welcome to your Blog",
  });
});

// Undefined Route
app.get("*", (req, res) => {
  return res.status(404).send({
    status: false,
    message: "Route does not exist",
  });
});

module.exports = app;

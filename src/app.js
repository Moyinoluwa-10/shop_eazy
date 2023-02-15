const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

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

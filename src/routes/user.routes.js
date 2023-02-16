const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/user.controller");
const { addUserValidationMW } = require("../validators/user.validator");

router.post("/signup", addUserValidationMW, createUser);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;

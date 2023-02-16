const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const createUser = async (req, res, next) => {
  try {
    const body = req.body;

    // check if user already exists
    const user = await userModel.findOne({ email: body.email });

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }

    // create a new user
    const createdUser = await userModel.create(body);

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    error.source = "create user controller";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // get the email and password from the request body
    const { email, password } = req.body;
    // check database for user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "email or password is incorrect",
      });
    }
    const passwordIsValid = await user.isValidPassword(password);

    if (!passwordIsValid) {
      return res.status(401).json({
        status: false,
        message: "email or password is incorrect",
      });
    }

    const body = {
      username: user.email,
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const validityPeriod = "1h";

    const token = jwt.sign(body, JWT_SECRET, {
      expiresIn: validityPeriod,
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {};

module.exports = { createUser, loginUser, logout };

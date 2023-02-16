const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    phone_number: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    delivery_address: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (req, res, next) {
  try {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (error) {
    error.source = "user model save";
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  } catch (error) {
    error.source = "user model password method";
    next(error);
  }
};

module.exports = mongoose.model("User", userSchema);

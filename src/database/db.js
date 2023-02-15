const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/config");

function connectToMongoDB() {
  mongoose.set("strictQuery", false);

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };

const app = require("./app");
const { PORT } = require("./config/config");
const { connectToMongoDB } = require("./database/db");
const logger = require("./logging/logger");

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});

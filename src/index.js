const app = require("./app");
const { PORT } = require("./config/config");
const { connectToMongoDB } = require("./database/db");

connectToMongoDB();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

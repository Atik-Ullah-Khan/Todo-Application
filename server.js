require("dotenv").config();
const http = require("http");
const app = require("./src/app");

const connectToDatabase = require("./src/config/database");
const { port, mongo_connection_string } = require("./src/config/variables");

const server = http.createServer(app);

server.listen(port, () => {
  connectToDatabase(mongo_connection_string);
  console.log("Server started ⚡");
});

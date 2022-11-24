const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const notFound = require("./api/controllers/notFoundController");
const errorHandler = require("./api/middlewares/errorHandler");

const authRoute = require("./api/routes/authRoute");
const todoRoute = require("./api/routes/todoRoute");

app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

app.use("*", notFound);
app.use(errorHandler);

module.exports = app;

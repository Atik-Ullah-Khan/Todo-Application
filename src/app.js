const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const notFound = require("./api/controllers/notFoundController");
const errorHandler = require("./api/middlewares/errorHandler");

const userRoute = require("./api/routes/userRoute");
const todoRoute = require("./api/routes/todoRoute");

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);
app.use("/ping", (_req, res) => res.status(200).send("pong"));

app.use("*", notFound);
app.use(errorHandler);

module.exports = app;

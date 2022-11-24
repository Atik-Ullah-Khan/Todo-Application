/***
 * Title : Todo routes.
 * Author : Atik Ullah Khan.
 * Description : All the routes related to the Todo.
 * Date : 24/11/2022.
 ***/

const router = require("express").Router();

// middlewares.
const asyncWrapper = require("../middlewares/asyncWrapper");

// controllers.
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router
  .route("/")
  .get(asyncWrapper(getTodos))
  .post(asyncWrapper(createTodo))
  .patch(asyncWrapper(updateTodo))
  .delete(asyncWrapper(deleteTodo));

module.exports = router;

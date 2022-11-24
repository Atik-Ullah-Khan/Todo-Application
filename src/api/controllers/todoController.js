/***
 * Title : Todo CRUD operations.
 * Author : Atik Ullah Khan.
 * Description : CRUD operations on Todo collection.
 * Date : 24/11/2022.
 ***/

const Todo = require("../models/todo");
const CustomError = require("../../config/CustomError");

// module scaffolding.
const todo = {};

// get all todos.
todo.getTodos = async (req, res, _next) => {
  const { userId, filter } = req.body;

  const todos = await Todo.find({ userId }).select("-_id -__v");

  res.status(200).json({
    status: 200,
    message: `todos fetched successfully.`,
    todos,
  });
};

// create a new todo.
todo.createTodo = async (req, res, _next) => {};

// update an existing todo.
todo.updateTodo = async (req, res, _next) => {};

// delete an existing todo.
todo.deleteTodo = async (req, res, _next) => {};

module.exports = todo;

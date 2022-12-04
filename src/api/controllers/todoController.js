/***
 * Title : Todo CRUD operations.
 * Author : Atik Ullah Khan.
 * Description : CRUD operations on Todo collection.
 * Date : 24/11/2022.
 ***/

const Todo = require("../models/todo");
const CustomError = require("../../config/CustomError");
const { Types } = require("mongoose");

// module scaffolding.
const todo = {};

// get all todos.
todo.getTodos = async (req, res, _next) => {
  const userId = req.userId;

  const todos = await Todo.find({ userId })
    .select("-__v")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    message: "todos fetched successfully.",
    todos,
  });
};

// create a new todo.
todo.createTodo = async (req, res, _next) => {
  const { title, description, priority } = req.body;
  const userId = req.userId;

  const todoObject = {
    userId,
    title,
    description,
    priority,
  };

  const todo = await new Todo(todoObject).save();
  todo["__v"] = undefined;

  res.status(201).json({
    status: 201,
    message: "todo created successfully.",
    todo,
  });
};

// update an existing todo.
todo.updateTodo = async (req, res, next) => {
  const { _id, title, description, priority, completed } = req.body;
  const userId = req.userId;

  const todo = await Todo.findOne({ userId, _id }).select("-__v");

  if (!todo) return next(new CustomError(404, "todo not found."));

  todo.title = title ?? todo.title;
  todo.description = description ?? todo.description;
  todo.priority = priority ?? todo.priority;
  todo.completed = completed ?? todo.completed;

  await todo.save();

  res.status(200).json({
    status: 200,
    message: "todo updated successfully.",
    todo,
  });
};

// delete an existing todo.
todo.deleteTodo = async (req, res, next) => {
  const { _id } = req.body;
  const userId = req.userId;

  const todo = await Todo.findOne({ userId, _id });

  if (!todo) return next(new CustomError(404, "todo not found."));

  await todo.remove();

  res.status(200).json({
    status: 200,
    message: "todo deleted successfully.",
  });
};

module.exports = todo;

/***
 * Title : Todo model.
 * Author : Atik Ullah Khan.
 * Description : Create "Todo" model from Todo schema.
 * Date : 24/11/2022.
 ***/

const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low", "normal"],
      default: "normal",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = model("todo", todoSchema);

module.exports = Todo;

// models/Todo.js

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Ensure title is provided
  },
  completed: {
    type: Boolean,
    default: false,  // Default value for completed is false
  },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;

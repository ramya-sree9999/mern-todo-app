const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/mern-todo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(400).send("Error saving todo");
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.send("Todo deleted");
  } catch (err) {
    res.status(400).send("Error deleting todo");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

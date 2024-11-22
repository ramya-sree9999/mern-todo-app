const express = require("express");
const router = express.Router();

// Dummy data for now
let todos = [];

// GET all todos
router.get("/", (req, res) => {
    res.json(todos);
});

// POST a new todo
router.post("/", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    res.json(newTodo);
});

// PUT (update) a todo
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todo.completed = completed;
    res.json(todo);
});

// DELETE a todo
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id !== parseInt(id));
    res.json({ message: "Todo deleted successfully" });
});

module.exports = router;

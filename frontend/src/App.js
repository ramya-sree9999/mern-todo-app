import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("There was an error fetching todos!", error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios
        .post("http://localhost:5000/api/todos", { title: newTodo })
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo(""); // Clear input field
        })
        .catch((error) => console.error("There was an error adding the todo!", error));
    } else {
      console.log("Please enter a valid todo");
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.error("There was an error deleting the todo!", error));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

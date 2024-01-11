import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "../controller/api";
import TodoItem from "./TodoItem";
import { Button } from "@mui/material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async (text) => {
    try {
      const response = await createTodo( text, false );
      setTodos((prevTodos) => [...prevTodos, response]);
      setTodoText("");
    } catch (error) {
      console.error("Error adding todos:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText.trim() !== "") {
      handleAdd(todoText.trim());
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      await toggleTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  };

  return (
    <main className="container">
      <h1 className="sub-heading">Things ToDo</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          required
          type="text"
          name="todoText"
          placeholder="Add a new todo..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button className="form__button" type="submit" variant="contained">
          Add Todo
        </Button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              setTodos={setTodos}
              onDelete={handleDelete}
              onToggleCompleted={toggleCompleted}
            />
          ))}
      </div>
    </main>
  );
};
export default TodoList;

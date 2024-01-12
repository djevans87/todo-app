import React, { useEffect, useState } from "react";
import { createTodo, deleteAllTodos, deleteTodo, getTodos, toggleTodo } from "../controller/api";
import TodoItem from "./TodoItem";
import { Button } from "@mui/material";
import { useStore } from "../store/store";
import  { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [username] = useStore(state => [state.name]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos(username);
        setTodos(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [username]);

  const handleAdd = async (text) => {
    try {
      const response = await createTodo( username, text, false );
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

  const toggleCompleted = async (id) => {
    try {
      await toggleTodo(username,id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteTodo(username,id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTodos(username);
      setTodos([]);
      setTodoText("");
      console.log(`Deleted all todos for username: ${username}`);
    } catch(error) {
      console.error("Error deleting all todos:", error);
    }
  };

  //Deletes all guest Todos to clear space in DB
  const unloadHandler = async (event) => {
    event.preventDefault();
  
    if (username === "guest") {
      await handleDeleteAll();
      // Allow the page to unload after deletion is complete
      window.removeEventListener("beforeunload", unloadHandler);
      window.close(); // Close the window or take other appropriate action
    }
  }; 

useEffect(() => {
   window.addEventListener('beforeunload', unloadHandler);

  return () => {
    window.removeEventListener('beforeunload', unloadHandler);
  };
})
 
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
          <AddCircleRounded />
        </Button>
        <Button className="form__button"  variant="contained" onClick={handleDeleteAll}>
        <RemoveCircleRounded />
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

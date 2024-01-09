import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "./api";

const TodoList = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getTodosTest() {
      const res = await fetch("/api/todosTest");
      const todos = await res.json();

      setMessage(todos.mssg);
    }
    getTodosTest();
  },[]);

  return (
    <main className="container">
      <h1> Test Todo MERN App</h1>
      {message && <p>{message}</p>}
    </main>
  );
}

  // const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await getTodos();
//         setTodos(Array.isArray(response) ? response : []);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleAdd = async (text) => {
//     try {
//       const response = await createTodo({
//         text,
//         completed: false,
//       });
//       setTodos((prevTodos) => [...prevTodos, response]);
//     } catch (error) {
//       console.error("Error adding todos:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTodo(id);
//       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//     } catch (error) {
//       console.error("Error deleting todos:", error);
//     }
//   };

//   const toggleCompleted = async (id) => {
//     try {
//       await toggleTodo(id);
//       setTodos((prevTodos) =>
//         prevTodos.map((todo) =>
//           todo._id === id ? { ...todo, completed: !todo.completed } : todo
//         )
//       );
//     } catch (error) {
//       console.error("Error deleting todos:", error);
//     }
//   };

//   return (
//     <div className="todo-list">
//       <h1>Todo List</h1>
//       <Box sx={{ display: "flex" }}>
//         <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//           <FormLabel component="legend">Current ToDo's</FormLabel>
//           <FormGroup>
//             <FormControlLabel
//               control={
//                 <ul>
//                   {todos.map((todo) => (
//                     <TodoItem
//                       key={todo.id}
//                       todo={todo}
//                       onDelete={handleDelete}
//                       onToggleCompleted={toggleCompleted}
//                     />
//                   ))}
//                 </ul>
//               }
//             />
//             <AddTodo onAdd={handleAdd} />
//           </FormGroup>
//         </FormControl>
//       </Box>
//     </div>
//   );
// };
export default TodoList;

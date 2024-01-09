import { Button, Checkbox, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const TodoItem = ({ todo, onDelete, onToggleCompleted }) => (
  <div className="todo-item">
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleCompleted(todo.id)}
      />
      <ListItemText
        className={`todo-item-text ${todo.completed ? "completed" : ""}`}
        primary={todo.text}
      />
      <Button 
      onClick={() => onDelete(todo.id)} 
      startIcon={<DeleteIcon />}
      variant="contained">
        Delete
      </Button>
    </ListItem>
  </div>
);

export default TodoItem;

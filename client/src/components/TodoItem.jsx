import { Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";

const TodoItem = ({ todo, onDelete, onToggleCompleted }) => {
  const [isChecked, setIsChecked] = useState(todo.status);

  useEffect(() => {
    setIsChecked(todo.status);
  }, [todo.status]);

  return (
    <div className="todo">
      <p className={`todo-item-text ${isChecked ? "completed" : ""}`}>
        {todo.todo}
      </p>
      <div className="mutations">
        <Checkbox
          className="todo__status"
          checked={isChecked}
          onChange={() => {
            onToggleCompleted(todo._id);
          }}
        />
        <Button
          className="todo__delete"
          onClick={() => onDelete(todo._id)}
          variant="contained"
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
export default TodoItem;

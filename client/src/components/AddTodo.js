import { Box, Button, FormControl, Input } from "@mui/material";
import React from "react";

const AddTodo = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoText;
    if (input.value.trim() !== "") {
      onAdd(input.value.trim());
      input.value = "";
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard" onSubmit={handleSubmit}>
        <Input type="text" name="todoText" placeholder="Add a new todo..." />
        <Button 
        type="submit"
        variant="contained"
        >Add Todo</Button>
      </FormControl>
    </Box>
  );
};

export default AddTodo;

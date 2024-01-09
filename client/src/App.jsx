import React from "react";
import TodoList from "./components/TodoList";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
    <div>
      <TodoList />
     
    <Routes>
    <Route path="/home" element={<Home/>} />
    </Routes>
    </div>
    </Router>
  );
};

export default App;

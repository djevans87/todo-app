import React from "react"
import TodoList from "../components/TodoList"
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";

const  ToDoDashboard = () => {
    const navigate = useNavigate();
    const [name, removeAccess] = useStore((state) => [
        state.name,
        state.removeAccess,
      ]);
    return (
        <div>
           <TodoList />
        </div>
    );
    
}

export default ToDoDashboard;
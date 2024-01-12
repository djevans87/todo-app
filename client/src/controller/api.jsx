//import { useStore } from '../store/store';

const headers = {
  "Content-Type": "application/json",
  // You might need additional headers, depending on your server requirements
};

// const setAllowAccess = (access, username) => {
//   const [, changeName, allowAccess] = useStore.getState();
//   changeName(username);
//   allowAccess(access);
// };


export const getTodos = async (username,) => {
  const response = await fetch(`/api/${username}/todos`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const createTodo = async (username,text, status) => {
  const response = await fetch(`/api/${username}/todos`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ todo:text, status }),
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const deleteTodo = async (username, id) => {
 
  const response = await fetch(`/api/${username}/todos/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const deleteAllTodos = async (username) => {
  const response = await fetch(`/api/${username}/todos`, {
    method: "DELETE",
    headers: headers,
  });

  if(!response.ok) {
    throw new Error("Error deleting all todos for ");
  }

  return response.json()
};

export const toggleTodo = async (username,id) => {
  
  const response = await fetch(`/api/${username}/todos/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({}), // Adjust this payload as needed
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

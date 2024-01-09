const headers = {
  "Content-Type": "application/json",
  // You might need additional headers, depending on your server requirements
};

export const getTodos = async () => {
  const response = await fetch(`/api/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const createTodo = async (text, status) => {
  const response = await fetch(`/api/todos`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ text, status }),
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const deleteTodo = async (id) => {
 
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const toggleTodo = async (id) => {
  
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({}), // Adjust this payload as needed
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};
// export default {
//   toggleTodo,
// };

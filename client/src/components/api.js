
const headers = {
  "Content-Type": "application/json",
  // You might need additional headers, depending on your server requirements
};
export const getTodosTest = () =>
  fetch(`/api/todosTest`, {
    method: "GET",
    headers: headers,
  }).then((response) => response.json());

export const getTodos = () =>
  fetch(`/api/todos`, {
    method: "GET",
    headers: headers,
  }).then((response) => response.json());

export const createTodo = (todo) =>
  fetch(`/api/todos`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ todo }),
  }).then((response) => response.json());

export const deleteTodo = (id) =>
  fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((response) => response.json());

export const toggleTodo = (id) =>
  fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: headers,
  }).then((response) => response.json());

  // export default {
  //   getTodos,
  //   createTodo,
  //   deleteTodo,
  //   toggleTodo,
  // };
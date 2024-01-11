import { toast } from 'react-hot-toast';
import { useStore } from '../store/store';

const headers = {
  "Content-Type": "application/json",
  // You might need additional headers, depending on your server requirements
};

const setAllowAccess = (access, username) => {
  const [, changeName, allowAccess] = useStore.getState();
  changeName(username);
  allowAccess(access);
};

export const getRegistered = async (username, email, password, navigate) => {
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.error) {
      throw Error(data.error);
    }

    toast.success('Registration Successful!\nRedirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getLoggedIn = async (username, password, navigate) => {
   try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username,password }),
    });

    const data = await response.json();

    if (data.error) {
      throw Error(data.error);
    }
    setAllowAccess(true, username);

    toast.success('Login successful');
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getTodos = async (username,) => {
  const response = await fetch(`/api/user/${username}/todos`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const createTodo = async (username,text, status) => {
  const response = await fetch(`/api/user/${username}/todos`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ text, status }),
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const deleteTodo = async (username, id) => {
 
  const response = await fetch(`/api/user/${username}/todos/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Bad response from server");
  }

  return response.json();
};

export const toggleTodo = async (username,id) => {
  
  const response = await fetch(`/api/user/${username}/todos/${id}`, {
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

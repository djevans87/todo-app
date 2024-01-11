import { toast } from "react-hot-toast";
import { useStore } from "../store/store";

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
    const response = await fetch("/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Registration Successful!\nRedirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(data.error || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    toast.error("Registration failed, please try again");
  }
};

export const getLoggedIn = async (username, password, navigate) => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.error) {
      throw Error(data.error);
    }
    setAllowAccess(true, username);

    toast.success("Login successful");

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  } catch (error) {
    toast.error(error.message);
  }
};

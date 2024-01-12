import { toast } from "react-hot-toast";
import { useStore } from "../store/store";

const headers = {
  "Content-Type": "application/json",
  // You might need additional headers, depending on your server requirements
};

const setAllowAccess = (access, username) => {
  const { changeName, allowAccess } = useStore.getState();
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
      if (data.error.includes("username")) {
        toast.error(
          "Username is already in use. Please choose a different one."
        );
      } else if (data.error.includes("email")) {
        toast.error("Email is already in use. Please choose a different one.");
      } else {
        toast.error(data.error || "Registration failed");
      }
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
      if (data.field === "username") {
        toast.error("Invalid username, please try again.");
      } else if (data.field === "password") {
        toast.error("Invalid password, please try again.");
      } else {
        toast.error(data.error);
      }
    } else {
      setAllowAccess(true, username);
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  } catch (error) {
    toast.error("Error during login, please try again.");
  }
};

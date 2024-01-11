import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getLoggedIn } from "../controller/api";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await getLoggedIn(username, password, navigate);
    } catch (error) {
      console.error("Error logging in user", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login">
        <h2 className="login__title sub-heading">Login:</h2>
        <form className="login__form" onSubmit={login}>
          <input
            className="login__form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            required
          />
          <input
            className="login__form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password ..."
            required
          />
          <button className="login__form-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;

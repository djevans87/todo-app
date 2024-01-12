import React,{ useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getRegistered } from "../controller/user";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await getRegistered(username, email, password, navigate);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="register">
        <h2 className="register__title sub-heading">Register:</h2>
        <form className="register__form" onSubmit={register}>
          <input
            className="register__form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a username ..."
            required
          />
          <input
            className="register__form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter a email ..."
            required
          />
          <input
            className="register__form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password ..."
            required
          />
          <button className="register__form-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;

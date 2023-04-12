import React, { useContext, useState } from "react";
import axios from "axios";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";

function Login({ setShowNav }) {
  setShowNav(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, error, message } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Send the POST request to the backend
    login(user);
  };
  return (
    <div className="login">
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          {message}
          <div className="item">
            <label>email</label>
            <input
              name="email"
              type="text"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>password</label>
            <input
              name="password"
              type="text"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;

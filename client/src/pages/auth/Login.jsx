import React, { useContext, useEffect, useState } from "react";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setShowNav }) {
  let navigate = useNavigate();

  setShowNav(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {
    login,
    error,
    message,
    user: userInfo,
    reset,
  } = useContext(AuthContext);
  console.log({ userInfo });
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
  useEffect(() => {
    if (userInfo?.token) {
      navigate("/");
    }
  }, [userInfo?.token]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [message, error, toast]);

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

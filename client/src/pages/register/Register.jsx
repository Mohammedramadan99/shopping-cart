import React, { useState } from "react";
import axios from "axios";
function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    img: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Send the POST request to the backend
    try {
      // axios.put(url,body)
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/register",
        user
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          <div className="item">
            <label>first name</label>
            <input
              name="firstName"
              type="text"
              placeholder="first name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>last name</label>
            <input
              name="lastName"
              type="text"
              placeholder="last name"
              onChange={handleChange}
            />
          </div>
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
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Register;

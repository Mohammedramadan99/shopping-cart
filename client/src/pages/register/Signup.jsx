import React, { useState } from "react";
import axios from "axios";
function SignUp() {
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
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/login",
        user
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="SignUp">
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
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

export default SignUp;

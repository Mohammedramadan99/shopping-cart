import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
const URL = "http://localhost:3001";
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {}
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [family, setFamily] = useState({});
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Fetch families from server
  //   axios
  //     .post(`${URL}/api/register`)
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // ------------------ user Auth -----------------
  const register = (userData) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .post(`${URL}/api/auth/register`, { ...userData })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data?.message);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setMessage("");
        console.log(error.message);
      });
  };

  const login = (userData) => {
    axios
      .post(`${URL}/api/auth/login`, { ...userData })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        setError("");
        setMessage("");
        // after successful login
        console.log(user);
        localStorage.setItem("userInfo", JSON.stringify(res.data)); // where `token` is the JWT token received from the server

        // to get the token from local storage
        // const token = localStorage.getItem("token");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setMessage(error.response.data.message || error.response.data.error);
        console.log(error);
        console.log(message);
      });
  };

  const logout = () => {
    // to remove the token from local storage (for example, after logout)
    localStorage.removeItem("userInfo");
    setUser({});
  };

  // ------------------ User Family -----------------
  const createFamily = (familyData) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .post(`${URL}/api/family`, { ...familyData })
      .then((res) => {
        console.log(res.data);
        message("family created");
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setMessage("");
        console.log(error.message);
      });
  };
  const getFamily = (familyData) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .get(`${URL}/api/family`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFamily(res?.data?.family);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };
  const value = {
    user,
    family,
    message,
    error,
    register,
    login,
    logout,
    createFamily,
    getFamily,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

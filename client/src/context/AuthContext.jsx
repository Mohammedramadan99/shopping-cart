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
  const [section, setSection] = useState({});
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
        setError(error.response.data.message || error.response.data.errMessage);
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
        setError(error.response.data.message || error.response.data.error);

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
        setMessage("family created");
        console.log(message);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setMessage("");
        console.log(error);
      });
  };
  const getFamily = () => {
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
        setError(error?.response?.data?.message);
        console.log(error?.message);
      });
  };
  const addMember = (data) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    const fetchData = axios
      .post(`${URL}/api/family/member/${data?.familyId}`, data?.memberInfo, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("member added");
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
    console.log({ fetchData });
  };
  const removeFamily = () => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .delete(`${URL}/api/family`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setMessage("family removed");
        setError("");
        setFamily({});
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };
  const removeMember = (ids) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .delete(`${URL}/api/family/member/${ids.idNumber}/${ids.familyId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("member removed");
        setError("");
        getFamily();
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };

  // ------------------ Section -----------------
  const createSection = (sectionData) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .post(`${URL}/api/sections`, { ...sectionData })
      .then((res) => {
        console.log(res.data);
        setMessage("section created");

        setError("");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err?.response?.data?.error);
        setMessage("");
      });
  };
  const getSection = (sectionId) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .get(`${URL}/api/sections/section/${sectionId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSection(res?.data);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };
  const removerSection = (sectionId) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .delete(`${URL}/api/sections/${sectionId}/${family?._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("section removed");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };
  const getFamilySections = (familyId) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .get(`${URL}/api/sections/${familyId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSections(res?.data.sections);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };

  // ------------------ Products -----------------
  const getProducts = (sectionId) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .get(`${URL}/api/sections/${sectionId}/products`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res?.data);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.message);
      });
  };
  const addProduct = (product) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .post(`${URL}/api/products`, product, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res?.data);
        setMessage("Product Added");
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message || error.response.data.errMessage);
        console.log(error.message);
      });
  };
  const removeProduct = (product) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .delete(`${URL}/api/products/${product?._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getProducts(product?.sectionId);
        setMessage("Product removed");

        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message || error.response.data.errMessage);
        console.log(error.message);
      });
  };
  const addToCart = (ids) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .get(`${URL}/api/family/${ids?.familyId}/${ids?.productId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Product added to cart");
        getFamily();
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message || error.response.data.errMessage);
        console.log(error.message);
      });
  };
  const removeFromCart = (ids) => {
    // Add new family to server

    // const { data } = axios.post(`${URL}/api/auth/register`, { ...user });

    axios
      .delete(`${URL}/api/family/${ids?.familyId}/${ids?.productId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Product deleted from the cart");
        getFamily();
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message || error.response.data.errMessage);
        console.log(error.message);
      });
  };
  const reset = () => {
    setMessage("");
    setError("");
  };
  const value = {
    user,
    family,
    sections,
    section,
    products,
    message,
    error,
    register,
    login,
    logout,
    createFamily,
    getFamily,
    createSection,
    getFamilySections,
    getSection,
    removerSection,
    getProducts,
    addMember,
    removeMember,
    addProduct,
    removeProduct,
    addToCart,
    removeFromCart,
    removeFamily,
    reset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

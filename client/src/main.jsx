import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext.jsx";

import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <ToastContainer />
    </AuthContextProvider>
  </React.StrictMode>
);

// remove a family
// home links
// add to cart
// rename context api file to appContent instead of Auth context

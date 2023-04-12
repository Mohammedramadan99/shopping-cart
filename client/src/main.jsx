import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext.jsx";
import FamilyContextProvider from "./context/FamilyContext";
import "./index.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FamilyContextProvider>
        <App />
      </FamilyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

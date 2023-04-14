import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import "./Home.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home({ setShowNav, setShowFooter }) {
  setShowNav(false);
  setShowFooter(false);
  const { families, user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="home">
      <div className="container">
        {user?.token && <div className="user">Hi, {user?.firstName} </div>}

        <div className="links">
          <div className="link">
            <Link to={"/profile"}>profile</Link>
          </div>
          <div className="link">
            <Link to={"/family"}>family</Link>
          </div>
          <div className="link">
            <Link to={"/cart"}>cart</Link>
          </div>
          <div className="link">
            <Link to={"/sections"}>sections</Link>
          </div>
          <div className="link">
            <Link to={"/products"}>products</Link>
          </div>
          {user?.token ? (
            <div
              className="link"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              logout
            </div>
          ) : (
            <>
              <div className="link">
                <Link to={"/login"}>login</Link>
              </div>
              <div className="link">
                <Link to={"/register"}>register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

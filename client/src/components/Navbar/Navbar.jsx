import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../context/AuthContext";
function Navbar() {
  const { families, user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
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
          {user?.token && <div className="user">Hi, {user?.firstName} </div>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

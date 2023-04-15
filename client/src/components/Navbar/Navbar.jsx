import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const { families, user, logout } = useContext(AuthContext);
  const [showNav, setShowNav] = useState(false);
  return (
    <div className={`navbar ${showNav ? "md-screens" : ""}`}>
      <div className="container">
        <div className="menu">
          {!showNav ? (
            <FaHamburger onClick={() => setShowNav(!showNav)} />
          ) : (
            <AiOutlineClose onClick={() => setShowNav(false)} />
          )}
        </div>
        <div className={`links`}>
          <div className="link">
            <Link to={"/profile"}>profile</Link>
          </div>
          <div className="link">
            <Link to={"/family"}>family</Link>
          </div>
          <div className="link">
            <Link to={"/cart"}>cart</Link>
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
        {user?.token && (
          <div className="user">
            Hi, <span>{user?.firstName}</span>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

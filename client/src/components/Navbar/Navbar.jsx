import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../context/AuthContext";

import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const { families, user, logout } = useContext(AuthContext);
  const [showNav, setShowNav] = useState(false);
  return (
    <div className={`navbar ${showNav ? "md-screens" : ""}`}>
      <div className="container">
        <div className="menu">
          {!showNav ? (
            <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
          ) : (
            <AiOutlineClose onClick={() => setShowNav(false)} />
          )}
        </div>
        <div className={`links`}>
          {user?.token ? (
            <>
              <div className="link">
                <Link to={"/profile"} onClick={() => setShowNav(false)}>
                  profile
                </Link>
              </div>
              <div className="link">
                <Link to={"/family"} onClick={() => setShowNav(false)}>
                  family
                </Link>
              </div>
              <div className="link">
                <Link to={"/cart"} onClick={() => setShowNav(false)}>
                  cart
                </Link>
              </div>
              <div
                className="link"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                logout
              </div>
            </>
          ) : (
            <>
              <div className="link">
                <Link to={"/login"} onClick={() => setShowNav(false)}>
                  login
                </Link>
              </div>
              <div className="link">
                <Link to={"/register"} onClick={() => setShowNav(false)}>
                  register
                </Link>
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

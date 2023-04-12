import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;

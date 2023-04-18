import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home({ setShowNav, setShowFooter }) {
  setShowNav(false);
  setShowFooter(false);
  const { families, user, logout } = useContext(AppContext);
  console.log(user);
  return (
    <div className="home">
      <div className="container">
        {user?.token && (
          <div className="user">
            Hi, <span>{user?.firstName}</span>{" "}
          </div>
        )}

        <div className="links">
          {user?._id && (
            <>
              <div className="link">
                <Link to={"/profile"}>profile</Link>
              </div>
              <div className="link">
                <Link to={"/family"}>family</Link>
              </div>
              <div className="link">
                <Link to={"/cart"}>cart</Link>
              </div>
            </>
          )}

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

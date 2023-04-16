import React, { useContext, useEffect } from "react";
import "./Profile.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Edit from "./Edit";
function Profile({ setShowNav }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  setShowNav(true);
  const { user, family, getFamily, removeFamily } = useContext(AuthContext);
  console.log({ family });

  useEffect(() => {
    getFamily();
  }, []);
  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);

  return (
    <div className="page profile">
      <div className="container">
        <div className="userInfo">
          <div className="title">info</div>
          {edit && <Edit />}
          <div className="content">
            {user?.image ? (
              <div className="img">
                <img
                  src={user?.image}
                  width={100}
                  height={100}
                  style={{ borderRadius: "50%", margin: "auto" }}
                  alt="user"
                />
              </div>
            ) : (
              <div className="img_frame">img</div>
            )}
            <div className="name">
              <span>name</span>
              {`${user?.firstName}  ${user?.lastName}`}
            </div>
            <div className="email">
              <span>email</span>
              {user?.email}
            </div>
            <div className="id">
              <span>id Number</span>
              {user?.idNumber}
            </div>
          </div>
        </div>
        <div className="family">
          <div className="title">your family</div>
          {family?._id ? (
            <>
              <div className="header">
                <div className="famName">{family?.familyName}</div>
                {family?.parent === user._id && (
                  <div className="remove">
                    <FaTrash onClick={() => removeFamily()} />
                  </div>
                )}
              </div>
              <div className="members">
                {family?.members.length >= 1 ? (
                  family?.members?.map((item, i) => (
                    <div className="member">
                      <div className="number"> {i + 1} </div>
                      <div className="email">{item.email}</div>
                    </div>
                  ))
                ) : (
                  <div
                    className="note"
                    style={{ backgroundColor: "transparent", paddingLeft: "0" }}
                  >
                    no members, let's{" "}
                    <Link
                      to="/family/member"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      add
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="note">you don't have a family </div>
          )}
          {!family?.parent && (
            <div className="main-btn">
              <Link to="/family/create">create a family</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

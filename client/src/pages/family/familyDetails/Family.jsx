import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./Family.scss";
import { Link } from "react-router-dom";

function Family({ setShowNav }) {
  const {
    getSection,
    family,
    getFamilySections,
    getProducts,
    getFamily,
    products,
    sections,
    user,
  } = useContext(AuthContext);
  getFamily();
  useEffect(() => {
    if (user?.token) {
      getFamilySections(family?._id);
    }
    if (family?._id) {
      getSection(family?._id);
    }
  }, [family._id, user.token, products]);

  return (
    <div>
      <div className="family page">
        <div className="container">
          <div className="members_box">
            <div className="header">
              <div className="title">members</div>
              <Link to="/family/member" className="add">
                +
              </Link>
            </div>
            <div className="members">
              {family?.members?.map((member) => (
                <div className="member" key={member?._id}>
                  <div className="email">{member.email}</div>
                  <div className="idNumber"> {member.idNumber} </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rooms_box">
            <div className="header">
              <div className="title">rooms</div>
              <Link to="/section/create" className="add">
                +
              </Link>
            </div>
            <div className="rooms">
              {sections.map((sec) => (
                <Link to={`/section/${sec?._id}`} className="room">
                  <div className="name">{sec.sectionName}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Family;

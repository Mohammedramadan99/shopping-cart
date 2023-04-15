import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./Family.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
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
    message,
    reset,
    removeMember,
  } = useContext(AuthContext);
  useEffect(() => {
    getFamily();
  }, []);

  setShowNav(true);
  useEffect(() => {
    if (user?.token) {
      getFamilySections(family?._id);
    }
    if (family?._id) {
      getSection(family?._id);
    }
  }, [family._id, user.token, products]);

  const removeHandler = (memberId) => {
    const ids = {
      familyId: family._id,
      memberId,
    };
    removeMember(ids);
  };
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
                  <div className="info">
                    <div className="email">{member.email}</div>
                    <div className="idNumber"> {member.idNumber} </div>
                  </div>
                  <div className="control">
                    <div
                      className="trash"
                      onClick={() => removeHandler(member._id)}
                    >
                      <FaTrash />
                    </div>
                  </div>
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

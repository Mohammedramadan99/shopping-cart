import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./Family.scss";
import { Link, useNavigate } from "react-router-dom";
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
    error,
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
  }, [family?._id, user.token, products]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [message, error]);

  const removeHandler = (member) => {
    console.log({ member });
    const ids = {
      familyId: family?._id,
      idNumber: member.idNumber,
    };
    removeMember(ids);
  };
  const navigate = useNavigate();

  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
  console.log("user_id", user._id);
  return (
    <div>
      <div className="family page">
        <div className="container">
          {family?._id ? (
            <>
              <div className="members_box">
                <div className="header">
                  <div className="title">members</div>
                  {family.parent === user?._id && (
                    <Link to="/family/member" className="add">
                      +
                    </Link>
                  )}
                </div>
                <div className="members">
                  {family?.members?.length > 0 ? (
                    family?.members?.map((member) => (
                      <div className="member" key={member?._id}>
                        <div className="info">
                          <div className="email">{member.email}</div>
                          <div className="idNumber"> {member.idNumber} </div>
                        </div>
                        <div className="control">
                          {family.parent === user?._id && (
                            <div
                              className="trash"
                              onClick={() => removeHandler(member)}
                            >
                              <FaTrash />
                            </div>
                          )}
                          {user.idNumber === member.idNumber && (
                            <div
                              className="trash"
                              onClick={() => removeHandler(member)}
                            >
                              <FaTrash />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="note">family has no members</div>
                  )}
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
                  {sections?.length > 0 ? (
                    sections?.map((sec) => (
                      <Link to={`/section/${sec?._id}`} className="room">
                        <div className="name">{sec?.sectionName}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="note">family has no rooms</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="note">
              you don't have family,{" "}
              <Link to="/family/create">let's create</Link> your own one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Family;

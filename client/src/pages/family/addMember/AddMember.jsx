import React, { useContext, useEffect, useState } from "react";
import "./AddMember.scss";
import { AuthContext } from "../../../context/AuthContext";
function AddMember() {
  const { user, getFamily, family, addMember } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  useEffect(() => {
    getFamily();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      familyId: family?._id,
      memberInfo: {
        email,
        idNumber,
      },
    };

    addMember(data);
  };
  return (
    <div className="craeteSection page">
      <form onSubmit={submitHandler}>
        <div className="item">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="item">
          <input
            type="text"
            placeholder="id number"
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddMember;

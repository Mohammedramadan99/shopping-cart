import React, { useContext, useEffect, useState } from "react";
import "./AddMember.scss";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddMember() {
  const navigate = useNavigate();
  const { user, getFamily, family, addMember, error, reset, message } =
    useContext(AppContext);
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  useEffect(() => {
    getFamily();
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
      reset();
    }
    if (message) {
      setEmail("");
      setIdNumber("");
      toast.success(message);
      reset();
    }
  }, [error, message]);

  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
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
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="item">
          <input
            type="text"
            value={idNumber}
            placeholder="id number"
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <input type="submit" className="main-btn submit" />
      </form>
    </div>
  );
}

export default AddMember;

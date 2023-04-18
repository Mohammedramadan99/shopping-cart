import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateSection() {
  const { user, getFamily, family, createSection, message, error, reset } =
    useContext(AppContext);
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    getFamily();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const sectionData = {
      familyId: family._id,
      sectionName: roomName,
    };
    console.log(sectionData);
    createSection(sectionData);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      setRoomName("");
      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [message, error]);
  const navigate = useNavigate();

  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
  return (
    <div className="craeteSection page">
      <form onSubmit={submitHandler}>
        <div className="item">
          <input
            type="text"
            placeholder="room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <input type="submit" value="add" className="main-btn submit" />
      </form>
    </div>
  );
}

export default CreateSection;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function CreateSection() {
  const { user, getFamily, family, createSection } = useContext(AuthContext);
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
  return (
    <div className="craeteSection page">
      <form onSubmit={submitHandler}>
        <div className="item">
          <input
            type="text"
            placeholder="room name"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateSection;

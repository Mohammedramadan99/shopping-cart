import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function CreateFamily({ setShowNav }) {
  const { user, createFamily } = useContext(AuthContext);
  setShowNav(true);
  const [familyName, setFamilyName] = useState("");

  const [members, setMembers] = useState([{ email: "", idNumber: "" }]);
  const handleAddMember = () => {
    setMembers([...members, { email: "", idNumber: "" }]);
  };
  const handleMemberChange = (event, index) => {
    const { name, value } = event.target;
    const newMembers = [...members];
    newMembers[index][name] = value;
    setMembers(newMembers);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const familyData = {
      parent: user?._id,
      familyName,
      members,
    };
    console.log({ familyData });
    createFamily(familyData);
  };
  return (
    <div className="page create-family">
      <div className="container">
        <form>
          <div className="item">
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>

          <div className="item">
            {members.map((member, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={member.name}
                  onChange={(event) => handleMemberChange(event, index)}
                />
                <input
                  type="text"
                  name="idNumber"
                  placeholder="id number"
                  value={member.age}
                  onChange={(event) => handleMemberChange(event, index)}
                />
              </div>
            ))}
          </div>
        </form>
        <button type="button" onClick={handleAddMember}>
          Add Member
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateFamily;

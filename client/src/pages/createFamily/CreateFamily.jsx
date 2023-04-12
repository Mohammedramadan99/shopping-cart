import React, { useState } from "react";

function CreateFamily({ setShowNav }) {
  setShowNav(true);
  const [members, setMembers] = useState([{ name: "", age: "" }]);
  const handleAddMember = () => {
    setMembers([...members, { name: "", age: "" }]);
  };
  const handleMemberChange = (event, index) => {
    const { name, value } = event.target;
    const newMembers = [...members];
    newMembers[index][name] = value;
    setMembers(newMembers);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit members data to server using axios
  };
  return (
    <div className="page create-family">
      <div className="container">
        <form>
          <div className="item">
            <input type="text" placeholder="name" />
          </div>
          <div className="item">
            <input type="email" placeholder="email" />
          </div>
          <div className="item">
            {members.map((member, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={member.name}
                  onChange={(event) => handleMemberChange(event, index)}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
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
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default CreateFamily;

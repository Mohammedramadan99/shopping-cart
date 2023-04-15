import React, { useContext, useEffect } from "react";
import "./Profile.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Profile({ setShowNav }) {
  setShowNav(true);
  const { createFamily, user, family, getFamily } = useContext(AuthContext);
  console.log({ family });

  const createFamilyHandler = () => {
    // parent, familyName, members
    console.log({ user });
    const data = {
      parent: user?._id,
      familyName: "fam1",
      members: [
        {
          idNumber: "jkjoi21321",
          email: "mo@g.com",
        },
      ],
    };
    createFamily(data);
  };

  useEffect(() => {
    getFamily();
  }, []);
  console.log("first", family);
  return (
    <div className="page profile">
      <div className="container">
        <div className="userInfo">
          <div className="head">info</div>
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
        <div className="family">
          <div className="head">your family</div>
          {family?._id ? (
            <>
              <div className="famName">{family?.familyName}</div>
              <div className="members">
                {family?.members?.map((item, i) => (
                  <div className="member">
                    <div className="number"> {i + 1} </div>
                    <div className="email">{item.email}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>you don't have a family </>
          )}
        </div>
        <div className="main-btn" onClick={createFamilyHandler}>
          <Link to="/family/create">create a family</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;

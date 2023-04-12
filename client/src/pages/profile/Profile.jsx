import React, { useContext, useEffect } from "react";
import "./profile.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Profile() {
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
    <div className="page">
      <div className="container">
        <div className="userInfo">
          <div className="name">{`${user?.firstName}  ${user?.lastName}`}</div>
          <div className="email">{user?.email}</div>
          <div className="family">
            {family ? (
              <>
                <div className="family">
                  <div className="famName">{family?.familyName}</div>
                  <div className="members">
                    {family?.members?.map((item) => (
                      <div className="member">{item.email}</div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>no </>
            )}
          </div>
        </div>
        <div className="btn" onClick={createFamilyHandler}>
          <Link to="/family/create">create a family</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;

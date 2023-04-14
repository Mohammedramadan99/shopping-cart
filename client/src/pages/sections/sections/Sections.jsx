import React, { useContext, useEffect } from "react";
import "./Sections.scss";
import { AuthContext } from "../../../context/AuthContext";
function Sections() {
  const {
    getSection,
    family,
    getFamilySections,
    getProducts,
    getFamily,
    products,
    sections,
    user,
  } = useContext(AuthContext);
  useEffect(() => {
    getFamily();
    if (user?.token) {
      getFamilySections(family?._id);
    }
  }, [family._id, user.token]);
  return (
    <div className="sections page">
      <div className="container">se</div>
    </div>
  );
}

export default Sections;

import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
function SectionDetails() {
  const { user, section, getSection, getProducts, getFamily, family } =
    useContext(AuthContext);

  const { id } = useParams();
  console.log({ id });
  useEffect(() => {
    getFamily();
    if (family?._id) {
      getSection(id);
    }
  }, [family?._id]);
  useEffect(() => {
    if (section?._id) {
      getProducts(section?._id);
    }
  }, [section?._id]);

  return <div className="page">SectionDetails</div>;
}

export default SectionDetails;

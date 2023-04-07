import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

function Home() {
  const { families, addFamily } = useContext(AppContext);
  console.log(families);
  return <div>Home</div>;
}

export default Home;

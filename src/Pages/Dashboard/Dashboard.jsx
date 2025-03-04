import React from "react";
import { logoutUser } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div>
      {/* <Navbar/> */}
     
    </div>
  );
};

export default Dashboard;

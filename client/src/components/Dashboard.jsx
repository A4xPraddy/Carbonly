import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="bg-background/20 h-svh">
      <Navbar />
      <div className="p-12">
        <p>Secure Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;

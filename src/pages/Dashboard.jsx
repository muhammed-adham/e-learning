import React from "react";
import Overview from "./Overview";
import NavTabs from "../components/NavTabs";
import { Outlet } from "react-router";

const Dashboard = () => {
  const user = {
    name: "Vdham",
    email: "",
  };
  return (
    <>
      <div>
        <h5>Welcome back, {user.name}!</h5>
      </div>
      <NavTabs />
      {/* <Overview /> */}
      <Outlet />
    </>
  );
};

export default Dashboard;

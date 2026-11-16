import React from "react";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <SideMenu />
      <Outlet />
    </>
  );
};

export default Layout;

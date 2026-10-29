import React from "react";
import SideMenu from "../components/SideMenu";
import SlideBanner from "../components/SlideBanner";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router";
import CardCourses from "../components/CardCourses";

const Layout = () => {
  return (
    <>
      <SideMenu />
      <SlideBanner />
      <Outlet />
    </>
  );
};

export default Layout;

import React from "react";
import '../styles/components/navTabs.css'
import { Link } from "react-router";

const NavTabs = () => {
      const links = [
    {
      label: "overview",
      path: "",
    },
    {
      label: "enrollments",
      path: "enrollments",
    },
    {
      label: "personalization",
      path: "personalization",
    },
  ];
  return (
    <>
      {/* -----------Tabs----------- */}
      <div className="nav-tabs">
        {links.map((link, idx) => (
          <Link key={idx} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
      <hr />
    </>
  );
};

export default NavTabs;

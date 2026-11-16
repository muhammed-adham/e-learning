import React from "react";
import "../styles/components/btnLink.css";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const BtnLink = ({ label, icon, showArrow, onClick, href }) => {
  return (
    <Link to={href} className="btn-link" onClick={onClick}>
      {icon}
      {label}
      {showArrow && <IoIosArrowForward />}
    </Link>
  );
};

export default BtnLink;

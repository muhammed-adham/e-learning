import React from "react";
import "../styles/components/btnLink.css";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const BtnLink = ({ label }) => {
  return (
    <Link className="btn-link">
      {label}
      <IoIosArrowForward />
    </Link>
  );
};

export default BtnLink;

import React from "react";
import "../styles/components/cardEnrollment.css";
import { TbDotsFilled } from "react-icons/tb";
import { RiAiGenerate2Fill } from "react-icons/ri";
import BtnMuted from "./BtnMuted";
import BtnPrimary from "./BtnPrimary";

const CardEnrollment = ({
  url,
  title,
  lvl,
  desc,
  progress,
  badge,
  cta,
  opts,
}) => {
  return (
    <>
      <div className="card-enrollment">
        <div className="enrollment-course-img">
          <img src={url} alt={title} />
        </div>
        <div className="enrollment-course-container">
          <h6 className="enrollment-course-title">{title}</h6>
          <p className="enrollment-course-lvl">
            <RiAiGenerate2Fill />
            {lvl}
          </p>
        </div>
        <p className="enrollment-course-desc">{desc}</p>
        <div className="enrollment-course-progress-bar">{progress}</div>
        <div className="enrollment-course-badge"><BtnMuted label={badge}/></div>
        <div className="enrollment-course-cta"><BtnPrimary buttonText={'review content'}/></div>
        <div className="enrollment-course-opt"><TbDotsFilled /></div>
      </div>
    </>
  );
};

export default CardEnrollment;

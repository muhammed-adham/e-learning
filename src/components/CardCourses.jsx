import React from "react";
import "../styles/components/cardCourse.css";
import { RiAiGenerate2Fill } from "react-icons/ri";
import { FaStopwatch } from "react-icons/fa";

const CardCourses = () => {
  return (
    <>
      <div className="course-card">
        <div className="card-img">
          <img src="https://picsum.photos/id/1010/1600/600" alt="" />
        </div>
        <div className="card-header">
          <h6 className="card-title">JavaScript Essentials</h6>
          <p className="card-desc">
            Master the fundamentals of modern JavaScript (ES6+).
          </p>
        </div>
        <div className="card-info">
          <p className="course-lvl">
            <RiAiGenerate2Fill />
            Beginner
          </p>
          <p className="course-hours">
            {/* <ImStopwatch /> */}
            <FaStopwatch />
            56 hours
          </p>
        </div>
      </div>
    </>
  );
};

export default CardCourses;

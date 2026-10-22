import React from "react";
import "../styles/components/cardOverview.css";
import BtnLink from "./BtnLink";
import BtnPrimary from "./BtnPrimary";
import CardCourses from "./CardCourses";

const CardOverview = () => {
  return (
    <>
      <div className="card-container-enrolled">
        {/* <div className="card-title">Continue Learning!</div> */}
        <div className="card-course-title-container">
          <div className="card-course-title">
            <p>course</p>
            <div className="card-course-header">
              <h2>javascript fundamentals</h2>
              <i>Instructed By Muh Adham</i>
            </div>
          </div>
          <BtnLink label={"view all chapters"} />
        </div>

        <div className="card-nxtCourse-container">
          <div className="card-nxtCourse-title">
            <p>chapter 4</p>
            <h6>useState hook</h6>
          </div>
          <div className="card-chapter-container">
            <div class="card-course-progress-container">
              <div class="card-course-bar">
                <div className="bar-percentage" style={{ width: "70%" }}></div>
              </div>
              <span className="progress-text">6/9 Lessons</span>
            </div>
            <BtnPrimary buttonText={"resume lesson"} />
          </div>
        </div>
      </div>

    </>
  );
};

export default CardOverview;

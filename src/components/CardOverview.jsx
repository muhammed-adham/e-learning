import React from "react";
import "../styles/components/cardOverview.css";
import BtnLink from "./BtnLink";
import BtnPrimary from "./BtnPrimary";
import CardCourses from "./CardCourses";
import ProgressBar from "./ProgressBar";

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
          <BtnLink label={"View all chapters"} />
        </div>

        <div className="card-nxtCourse-container">
          <div className="card-nxtCourse-title">
            <p>chapter 4</p>
            <h6>useState hook</h6>
          </div>
          <div className="card-chapter-container">
            <ProgressBar progressWidth={70} />
            <BtnPrimary
              buttonText={"resume lesson"}
              buttonLink={"/coursesview"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOverview;

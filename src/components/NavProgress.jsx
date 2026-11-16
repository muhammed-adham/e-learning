import React from "react";
import "../styles/components/navProgress.css";
import ProgressBar from "./ProgressBar";
import BtnSecondary from "./BtnSecondary";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router";
import { MdArrowBackIos } from "react-icons/md";
import { useCourse } from "../context/CourseContext";
import BtnLink from "./BtnLink";
import { IoIosArrowBack } from "react-icons/io";

const NavProgress = () => {
  const {
    currentSectionTitle,
    currentSection,
    sectionDoneCount,
    sectionTotal,
    sectionPercent,
    course,
  } = useCourse();
  const sectionNumber = String((currentSection?.index ?? 0) + 1).padStart(
    2,
    "0",
  );
  return (
    <>
      <div className="navprogress-container container-inline">
        <div className="navprogress-left">
          <BtnLink
            label={"Dashboard"}
            icon={<IoIosArrowBack aria-hidden="true" />}
            href={"/"}
          />
          <div className="navprogress-header">
            <small className="course-title">{course.title}</small>
            <h3 className="course-title">
              <span className="section-number">{sectionNumber} |</span>
              {currentSectionTitle}
            </h3>
            <p className="course-instructor"></p>
          </div>
        </div>
        <div className="navprogress-progress">
          <div className="bar-state">
            <ProgressBar
              progressWidth={sectionPercent}
              label={`Lesson ${sectionDoneCount} completed · ${sectionTotal - sectionDoneCount} remaining`}
            />
          </div>
          {/* <div className="note-cta">Note</div> */}
          <BtnSecondary
            buttonLink={"/coursesview"}
            buttonText={"notes"}
            buttonIcon={<LuPenLine />}
          />
        </div>
      </div>
    </>
  );
};

export default NavProgress;

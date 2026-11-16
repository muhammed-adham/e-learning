import React from "react";
import "../styles/components/examPlayer.css";
import { EXAM_RULES } from "../data/courseData";
import { PiWarningCircleLight } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";

const ExamPlayer = ({ exam }) => {
  return (
    <article className="exam-player">
      <header className="ep-header">
        <p className="ep-eyebrow">Project</p>
        <h2 className="ep-title">{exam.title}</h2>
        {/* <p className="ep-sub">{exam.subtitle}</p> */}
        <small className="ep-meta">
          {/* <span>Project</span> */}
          <span>Timed Exam</span>|<span>{exam?.timeLimitSec / 60} min</span>|
          <span>{exam?.questions?.length} Questions</span>|
          <span>{exam?.passPercent + "%"} To pass</span>|
          <span>{exam?.maxViolations} Violations allowed</span>
        </small>
      </header>
      <div className="ep-body">
        <div div className="ep-body-title">
          <h6><IoWarningOutline />{EXAM_RULES.title}</h6>
          <small className="ep-subtitle">{EXAM_RULES.subtitle}</small>
        </div>
        <ul className="ep-text">
          {EXAM_RULES?.rules?.map((rl, idx) => (
            <li>{rl.text}</li>
          ))}
        </ul>
      </div>
      <footer className="ep-footer">
        <form action="">
          <input type="checkbox" className="check-box" />
          <label htmlFor="">{EXAM_RULES?.agreeLabel}</label>
          <button className="btn-attempt">{EXAM_RULES?.startLabel}</button>
        </form>
      </footer>
    </article>
  );
};

export default ExamPlayer;

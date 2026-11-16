import React from "react";
import "../styles/components/progressBar.css";

const ProgressBar = ({ progressWidth = 45, label }) => {
  return (
    <>
      <div className="progress-bar-container">
        <div className="bar">
          <div
            className="bar-percentage"
            style={{ width: progressWidth + "%" }}
          ></div>
        </div>
        <span className="lesson-state">{label ?? `${progressWidth}%`}</span>
      </div>
    </>
  );
};

export default ProgressBar;

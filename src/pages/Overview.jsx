import React, { useState } from "react";
import TimeframeDropdown from "../components/TimeframeDropdown";
import "../styles/pages/overview.css";
import BtnPrimary from "../components/BtnPrimary";
import {
  MdOutlineAccessTime,
  MdOutlineAssignmentTurnedIn,
  MdOutlineLibraryBooks,
  MdOutlineSchool,
} from "react-icons/md";
import CardOverview from "../components/CardOverview";

const STAT_ICONS = {
  "learning-hours": MdOutlineAccessTime,
  "concepts-completed": MdOutlineSchool,
  "lessons-completed": MdOutlineLibraryBooks,
  "projects-completed": MdOutlineAssignmentTurnedIn,
};

const stats = [
  {
    id: 1,
    className: "learning-hours",
    label: "Learning Hours",
    value: 128,
  },
  {
    id: 2,
    className: "concepts-completed",
    label: "Concepts Completed",
    value: 46,
  },
  {
    id: 3,
    className: "lessons-completed",
    label: "Lessons Completed",
    value: 82,
    unit: "",
  },
  {
    id: 4,
    className: "projects-completed",
    label: "Projects Completed",
    value: 7,
  },
];



const USER_ACTIVE_STAT = "active";
const Overview = () => {
  const [timeframe, setTimeframe] = useState(30);
  return (
    <>
      {/* -----------Overview Section----------- */}
      <div className="overview-page container-inline">
        {/* -----------Overview Board 2 State Mapping----------- */}
        {USER_ACTIVE_STAT === "inactive" ? (
          // -----------Empty Stat-----------
          <div className="overview-container-empty">
            <b className="overview-title">Let’s get you started!</b>
            <p className="overview-desc">
              You haven’t started learning yet — let’s find the right course to
              kick things off. Browse popular programs to begin.
            </p>
            <div className="overview-btn">
              <BtnPrimary buttonText={"browse catalog"} />
            </div>
          </div>
        ) : (
          // -----------Enrolled Stat-----------
          <CardOverview />
        )}

        {/* -----------Progress Section----------- */}
        <div className="progress-container">
          <div className="dropdown-timeframe">
            <b>Your Progress</b>
            <TimeframeDropdown value={timeframe} onChange={setTimeframe} />
          </div>
          <div className="progress-cards grid grid-cols-2 gap-2">
            {stats.map((stat) => {
              const Icon = STAT_ICONS[stat.className];
              return (
                <div
                  key={stat.id}
                  className={`progress-item ${stat.className}`}
                >
                  <span className="stat-icon">{Icon && <Icon />}</span>
                  <span className="stat-value">{stat.value}</span>
                  <p className="stat-label">{stat.label}</p>
                </div>
              );
            })}
          </div>
          {/* -----------Help Section----------- */}
          <div className="help-container text-start">
            <div className="help-icon"></div>
            <div className="help-content">
              <h6 className="title">Account Help</h6>
              <div className="sub-title">Need account help?</div>
              <div className="btn-link">Visit Help Center</div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Overview;

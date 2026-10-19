import React from "react";
import "../styles/pages/overview.css";
import BtnPrimary from "../components/BtnPrimary";
import {
  MdOutlineAccessTime,
  MdOutlineAssignmentTurnedIn,
  MdOutlineMenuBook,
  MdOutlineSchool,
} from "react-icons/md";
import { Link } from "react-router";

// Icons are static UI, keyed by stat className, so the database only
// needs to supply { className, label, value } per user.
const STAT_ICONS = {
  "learning-hours": MdOutlineAccessTime,
  "concepts-completed": MdOutlineSchool,
  "lessons-completed": MdOutlineMenuBook,
  "projects-completed": MdOutlineAssignmentTurnedIn,
};

const Overview = () => {
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

  return (
    <>
      {/* -----------Overview Page----------- */}
      <div className="overview-page container-inline">
        {/* -----------Overview Board----------- */}
        <div className="overview-container">
          <div className="overview-title">Let’s get you started!</div>
          <div className="overview-desc">
            You haven’t started learning yet — let’s find the right course to
            kick things off. Browse popular programs to begin.
          </div>
          <div className="overview-btn">
            <BtnPrimary buttonText={"browse catalog"} />
          </div>
        </div>
        {/* -----------Progress Stats----------- */}
        <div className="progress-container">
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
              <div className="title">Account Help</div>
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

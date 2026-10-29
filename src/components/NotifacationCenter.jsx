import React, { useMemo, useState } from "react";
import "../styles/components/notificationCenter.css";
import { MdAssignment } from "react-icons/md";
import { BsChatLeftTextFill } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";
import { IoIosBookmark } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiCalendarCheck } from "react-icons/bi";

const NotifacationCenter = () => {
  const TYPE_ICON = {
    assignment: MdAssignment,
    quiz: PiExamFill,
    feedback: BsChatLeftTextFill,
  };

  const PRIORITY = {
    high: "danger",
    medium: "warning",
    low: "info",
  };

  const NOTIFICATIONS = [
    {
      id: "notif-001",
      type: "assignment",
      title: "Assignment Due Soon",
      message:
        "Your submission for 'Module 3: Advanced React Patterns' is required.",
      courseName: "Advanced Web Dev (CS-301)",
      created_at: "2026-10-28T10:14:00Z",
      isRead: true,
      actionUrl: "/courses/react-101/assignments/mod-3",
      priority: "high",

      deadline: "2026-10-27T14:00:00Z",
      actor: {
        name: "Prof. Sarah Jenkins",
        role: "instructor",
        avatar: "https://i.pravatar.cc/150?u=sarah",
      },
    },
    {
      id: "notif-002",
      type: "quiz",
      title: "Upcoming Midterm Quiz",
      message:
        "The online quiz for 'Database Systems' will open tomorrow morning.",
      courseName: "UI/UX Principles (DES-102)",
      created_at: "2026-10-25T10:14:00Z",
      isRead: false,
      actionUrl: "/courses/db-101/quizzes/midterm",
      priority: "medium",
      deadline: "2026-10-28T23:59:59Z",
      actor: {
        name: "Dr. Alex Rivera",
        role: "instructor",
        avatar: "https://i.pravatar.cc/150?u=alex",
      },
    },
    {
      id: "notif-003",
      type: "feedback",
      title: "Grade Posted",
      message: "You received 94/100 on 'Data Structures Midterm Exam'.",
      courseName: "Platform Announcement",
      created_at: "2026-10-28T09:14:00Z",
      isRead: true,
      actionUrl: "/grades/ds-202/midterm",
      priority: "low",
      deadline: null,
      actor: {
        name: "Dr. Alex Rivera",
        role: "system",
        avatar: "https://i.pravatar.cc/150?u=alex",
      },
    },
  ];

  // ---Quick filters
  const [readFilter, setReadFilter] = useState("all"); // all | unread | read
  const [priorityFilter, setPriorityFilter] = useState("all"); // all | high | medium | low
  const [courseFilter, setCourseFilter] = useState("all"); // all | <courseName>

  const COURSE_NAMES = useMemo(
    () => [...new Set(NOTIFICATIONS.map((n) => n.courseName))],
    [],
  );

  const VISIBLE_NOTIFICATIONS = NOTIFICATIONS.filter(
    (n) =>
      (readFilter === "all" || (readFilter === "read") === n.isRead) &&
      (priorityFilter === "all" || n.priority === priorityFilter) &&
      (courseFilter === "all" || n.courseName === courseFilter),
  );
  const HAS_ACTIVE_FILTER =
    readFilter !== "all" || priorityFilter !== "all" || courseFilter !== "all";

  const resetFilters = () => {
    setReadFilter("all");
    setPriorityFilter("all");
    setCourseFilter("all");
  };

  const READ_OPTIONS = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
  ];
  const PRIORITY_OPTIONS = [
    { value: "all", label: "Any priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <>
      <div className="notification-container container-inline">
        <h6 className="section-header ">notification center</h6>
        <div className="timeline"></div>

        <div className="notification-filters">
          <div className="filter-group" role="group" aria-label="Read status">
            {READ_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`filter-chip${readFilter === o.value ? " is-active" : ""}`}
                aria-pressed={readFilter === o.value}
                onClick={() => setReadFilter(o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="filter-group" role="group" aria-label="Priority">
            {PRIORITY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`filter-chip${priorityFilter === o.value ? " is-active" : ""}`}
                data-priority={o.value}
                aria-pressed={priorityFilter === o.value}
                onClick={() => setPriorityFilter(o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>

          <select
            className="filter-select"
            aria-label="Filter by course"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All courses</option>
            {COURSE_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {HAS_ACTIVE_FILTER && (
            <button type="button" className="filter-clear" onClick={resetFilters}>
              Clear
            </button>
          )}
        </div>

        <div className="notifications ">
          {VISIBLE_NOTIFICATIONS.length === 0 && (
            <p className="notifications-empty">
              No notifications match your filters.
            </p>
          )}
          {VISIBLE_NOTIFICATIONS.map((el) => {
            const ICON = TYPE_ICON[el.type];
            const DEADLINE = new Date(el?.deadline).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" },
            );

            // ---TimeStamp
            const TIMESTAMP = (createdAtString = el.created_at) => {
              const MINUTE = 60 * 1000;
              const HOUR = 60 * MINUTE;
              const DAY = 24 * HOUR;

              const createdAt = new Date(createdAtString);
              const now = new Date();
              const diff = now - createdAt;

              if (diff < MINUTE) {
                return "Just now";
              } else if (diff < HOUR) {
                const minutes = Math.floor(diff / MINUTE);
                return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
              } else if (diff < DAY) {
                const hours = Math.floor(diff / HOUR);
                return `${hours} hour${hours > 1 ? "s" : ""} ago`;
              } else {
                const days = Math.floor(diff / DAY);
                if (days < 7) {
                  return `${days} day${days > 1 ? "s" : ""} ago`;
                }
                // Fallback to absolute date if older than a week
                return createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }
            };

            return (
              <React.Fragment key={el.id}>
                <div
                  className="notification-item"
                  style={{
                    "--priority-color": `var(--${PRIORITY[el.priority]})`,
                  }}
                >
                  <div
                    className="notification-type-container"
                    style={{ color: "var(--priority-color)" }}
                  >
                    <div className="notification-type">
                      {ICON && <ICON />} {el.type}
                    </div>
                    <b className="notification-course-name notification-type">
                      |<IoIosBookmark />
                      {el.courseName}
                    </b>
                    {el.deadline ? (
                      <b className="notificate-deadline notification-type">
                        |<BiCalendarCheck /> {DEADLINE}
                      </b>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="notification-content">
                    <h6 className="notification-title">
                      {el.isRead ? (
                        <div
                          className="read-receipt"
                          style={{ background: "var(--priority-color)" }}
                        ></div>
                      ) : (
                        ""
                      )}
                      {el.title}
                    </h6>
                    <p className="notification-message">{el.message}</p>
                  </div>
                  <p className="timestamp">
                    {el?.actor?.name}
                    {" • "}
                    {TIMESTAMP()}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <hr />
    </>
  );
};

export default NotifacationCenter;

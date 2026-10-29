import React from "react";
import "../styles/components/cardCourse.css";
import { FaRegCalendarCheck, FaStopwatch } from "react-icons/fa";
import BtnSecondary from "./BtnSecondary";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const LIMITED_THRESHOLD = 10;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const isValidDate = (d) => d instanceof Date && !isNaN(d);

const formatDate = (value) => {
  const d = new Date(value);
  return isValidDate(d) ? dateFormatter.format(d) : "";
};

const isEnrollmentClosed = (deadline, now) => {
  if (!deadline) return false;
  const d = new Date(deadline);
  return isValidDate(d) && now > d;
};

const getCtaLabel = ({ enrollmentDeadline, capacity, seatsTaken }, now) => {
  if (isEnrollmentClosed(enrollmentDeadline, now)) return "Notify me";
  if (seatsTaken >= capacity) return "Join waitlist";
  return "Enroll";
};

const getBadge = (
  { enrollmentDeadline, capacity, seatsTaken, startDate },
  now,
) => {
  if (isEnrollmentClosed(enrollmentDeadline, now))
    return { text: "Enrollment closed", className: "card-badge-neutral" };

  const seatsLeft = capacity - seatsTaken;
  if (seatsLeft <= 0) return { text: "Fully booked", className: "card-badge-danger" };

  if (seatsLeft < LIMITED_THRESHOLD)
    return {
      text: `Only ${seatsLeft} seats left`,
      className: "card-badge-warning",
    };

  const msUntilStart = new Date(startDate) - now;
  if (msUntilStart > 0 && msUntilStart < ONE_WEEK)
    return { text: "Starting soon", className: "card-badge-info" };

  return null;
};

const CardCourses = ({
  title,
  durationHours,
  thumbnail,
  description,
  startDate,
  capacity,
  seatsTaken,
  enrollmentDeadline,
  instructor,
}) => {
  const now = new Date();
  const course = { enrollmentDeadline, capacity, seatsTaken, startDate };
  const badge = getBadge(course, now);
  const startLabel = formatDate(startDate);

  return (
    <div className="course-card">
      {badge && <div className={`card-badge ${badge.className}`}>{badge.text}</div>}

      <div className="card-img">
        <img src={thumbnail} alt={title} loading="lazy" />
      </div>

      <div className="card-header">
        <h6 className="card-title" title={title}>
          {title}
        </h6>
        <p className="card-desc">{description}</p>
        <hr />
        <div className="card-content">
          {startLabel && (
            <div className="card-stdate">
              <FaRegCalendarCheck aria-hidden="true" />
              <b>{startLabel}</b>
            </div>
          )}
          {instructor?.name && (
            <i className="card-instructor">Instructed by {instructor.name}</i>
          )}
        </div>
      </div>

      <div className="card-info">
        {durationHours != null && (
          <p className="course-hours">
            <FaStopwatch aria-hidden="true" />
            {durationHours} Hours
          </p>
        )}
        <BtnSecondary buttonText={getCtaLabel(course, now)} />
      </div>
    </div>
  );
};

export default CardCourses;

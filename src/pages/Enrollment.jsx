import React from "react";
import "../styles/pages/enrollment.css"
import CardEnrollment from "../components/CardEnrollment";

// Dummy data until the API is wired up. Props match <CardOverview />.
const COURSES = [
  {
    id: 1,
    url: "https://picsum.photos/id/1015/400/240",
    title: "React for Beginners",
    desc: "Build modern UIs with components, hooks and routing.",
    progress: "65%",
    badge: "In progress",
    cta: "Continue",
    lvl:"Beginners",
    opts: "⋮",
  },
  {
    id: 2,
    url: "https://picsum.photos/id/1018/400/240",
    title: "JavaScript Essentials",
    desc: "Master the fundamentals of modern JavaScript (ES6+).",
    progress: "100%",
    badge: "Completed",
    cta: "View certificate",
    lvl:"intermediate",
    opts: "⋮",
  },
  {
    id: 3,
    url: "https://picsum.photos/id/1025/400/240",
    title: "UI/UX Design Basics",
    desc: "Learn layout, color and usability principles.",
    progress: "0%",
    badge: "Not started",
    cta: "Start course",
    lvl:"Advanced",
    opts: "⋮",
  },
];

const Enrollment = () => {
  return (
    <>
      <div className="enrollment-container container-inline">
        {COURSES.map(({ id, ...course }) => (
          <CardEnrollment key={id} {...course} />
        ))}
      </div>
    </>
  );
};

export default Enrollment;

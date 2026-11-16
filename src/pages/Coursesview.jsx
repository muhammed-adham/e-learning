import React, { useEffect, useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import NavProgress from "../components/NavProgress";
import CourseContents from "../components/CourseContents";
import CoursePlayer from "../components/CoursePlayer";
import { CourseProvider } from "../context/CourseContext";
import "../styles/components/courseView.css";
import { RiSideBarFill } from "react-icons/ri";

// One provider so NavProgress, CourseContents and CoursePlayer share the same
// course data, current lesson and completion state.
const Coursesview = () => {
  // Only matters under 768px, where the contents panel is an overlay.
  const [contentsOpen, setContentsOpen] = useState(false);

  useEffect(() => {
    if (!contentsOpen) return;
    const onKey = (e) => e.key === "Escape" && setContentsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contentsOpen]);

  return (
    <CourseProvider>
      <div className="courseview">
        <NavProgress />
        <div className="courseview-layout">
          <CourseContents
            isOpen={contentsOpen}
            onSelect={() => setContentsOpen(false)}
          />
          <div className="courseview-toggle">
            <button
              type="button"
              aria-label="Course contents"
              aria-expanded={contentsOpen}
              aria-controls="course-contents-panel"
              onClick={() => setContentsOpen((o) => !o)}
            >
              {contentsOpen ? <RiSideBarFill /> : <RiSideBarFill />}
            </button>
          </div>
          <CoursePlayer />
        </div>
        <div
          className={`courseview-backdrop${contentsOpen ? " is-open" : ""}`}
          onClick={() => setContentsOpen(false)}
          aria-hidden="true"
        />
      </div>
    </CourseProvider>
  );
};

export default Coursesview;

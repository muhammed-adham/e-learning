import React, { useEffect, useRef, useState } from "react";
import "../styles/components/courseContents.css";
import {
  MdClose,
  MdMyLocation,
  MdSearch,
  MdCheckCircle,
  MdKeyboardArrowDown,
  MdPlayCircle,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import ProgressBar from "./ProgressBar";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { useCourse } from "../context/CourseContext";
import BtnLink from "./BtnLink";

const STATUS_ICON = {
  done: MdCheckCircle,
  current: MdPlayCircle,
  todo: MdRadioButtonUnchecked,
  locked: IoLockClosedOutline,
};

const formatMinutes = (sec) => `${Math.max(1, Math.round(sec / 60))} min`;

const formatTimeLeft = (sec) => {
  if (sec <= 0) return "Completed";
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h}h ${m}m left` : `${m}m left`;
};

const CourseContents = ({ isOpen = false, onSelect }) => {
  const {
    sections,
    lessons,
    current,
    percent,
    doneCount,
    total,
    secondsLeft,
    selectLesson,
    totalSections,
    course,
  } = useCourse();

  // Sections the user toggled by hand. A section that holds the current lesson
  // is open by default; toggling flips it relative to that default, so
  // selecting a lesson in another section (e.g. via Next) opens its section.
  const currentSectionId = sections[current.sectionIndex]?.id;
  const [openIds, setOpenIds] = useState(() => new Set([currentSectionId]));
  const [seenSectionId, setSeenSectionId] = useState(currentSectionId);

  // When the current lesson moves to another section, open that section
  // without closing the ones the user already has open.
  if (seenSectionId !== currentSectionId) {
    setSeenSectionId(currentSectionId);
    setOpenIds((prev) => new Set(prev).add(currentSectionId));
  }

  // ---- Search: filters lessons by lesson or section title ----
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visibleSections = q
    ? sections
        .map((s) => ({
          ...s,
          lessons: s.title.toLowerCase().includes(q)
            ? s.lessons
            : s.lessons.filter((l) => l.title.toLowerCase().includes(q)),
        }))
        .filter((s) => s.lessons.length > 0)
    : sections;

  // While searching, every section with a match is shown open
  const isSectionOpen = (id) => (q ? true : openIds.has(id));

  // ---- Jump to the current lesson ----
  const panelRef = useRef(null);
  const [jumpTick, setJumpTick] = useState(0);

  // Goes to the first lesson that is neither completed nor locked (where the
  // learner should continue). If the whole course is done, stays on the
  // lesson that is open now.
  const jumpToCurrent = () => {
    const target = lessons.find((l) => !l.isDone && !l.isLocked) ?? current;
    setQuery("");
    setOpenIds((prev) => new Set(prev).add(sections[target.sectionIndex].id));
    selectLesson(target.id);
    setJumpTick((t) => t + 1); // scroll after the section has opened
  };

  useEffect(() => {
    if (!jumpTick) return;
    const target = panelRef.current?.querySelector('[aria-current="step"]');
    if (!target) return;

    // Scroll only the panel's own scroller (the sticky body on desktop, the
    // overlay container on mobile) — scrollIntoView also moves the page and
    // browsers often drop the inner smooth scroll when both move.
    let scroller = target.parentElement;
    while (scroller && scroller !== panelRef.current.parentElement) {
      const { overflowY } = getComputedStyle(scroller);
      if (
        /(auto|scroll)/.test(overflowY) &&
        scroller.scrollHeight > scroller.clientHeight
      ) {
        break;
      }
      scroller = scroller.parentElement;
    }
    if (scroller && scroller !== panelRef.current.parentElement) {
      const offset =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top;
      scroller.scrollTo({
        top: scroller.scrollTop + offset - scroller.clientHeight / 2,
        behavior: "smooth",
      });
    }
    target.focus({ preventScroll: true });
  }, [jumpTick]);

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div
      ref={panelRef}
      id="course-contents-panel"
      className={`courseContents-container${isOpen ? " is-open" : ""}`}
    >
      <div className="courseContents-body">
        <div className="courseContents-header">
          <h6>Course Contents</h6>
          <p>
            {totalSections} Sections · {lessons?.length} Lessons
          </p>
        </div>

        <div className="courseContents-search">
          <MdSearch className="search-icon" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search lessons"
            aria-label="Search lessons"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <MdClose aria-hidden="true" />
            </button>
          )}
        </div>

        <BtnLink
          icon={<MdMyLocation aria-hidden="true" />}
          label={"Jump to current lesson"}
          onClick={jumpToCurrent}
        />

        <div
          className="courseContents-progress"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course progress"
          aria-valuetext={`${percent}% completed`}
        >
          <ProgressBar progressWidth={percent} label={`${percent}%`} />
        </div>

        <div className="courseContents-sections">
          {q && visibleSections.length === 0 && (
            <p className="courseContents-empty" role="status">
              No lessons match “{query.trim()}”
            </p>
          )}
          {visibleSections.map((section) => {
            const isOpen = isSectionOpen(section.id);
            // Counts always use the full section, even while a search filters it
            const all = sections[section.index].lessons;
            const done = all.filter((l) => l.isDone).length;
            const panelId = `cc-panel-${section.id}`;
            const sectionDone = done === all.length;

            return (
              <section
                key={section.id}
                className={`courseContents-section${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="courseContents-title"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(section.id)}
                >
                  <span className="section-index">
                    {String(section.index + 1).padStart(2, "0")}
                  </span>
                  <span className="section-name">{section.title}</span>
                  <span
                    className={`section-count ${sectionDone ? "is-completed" : ""}`}
                  >
                    {sectionDone && <IoIosCheckmark />}
                    {done}/{all.length}
                  </span>
                  <MdKeyboardArrowDown
                    className="section-arrow"
                    aria-hidden="true"
                  />
                </button>

                <ul
                  id={panelId}
                  className="courseContents-lessons"
                  hidden={!isOpen}
                >
                  {section.lessons.map((lesson) => {
                    const Icon =
                      STATUS_ICON[lesson.status] ?? MdRadioButtonUnchecked;
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          className={`lesson lesson-${lesson.status}`}
                          disabled={lesson.isLocked}
                          aria-current={lesson.isCurrent ? "step" : undefined}
                          onClick={() => {
                            selectLesson(lesson.id);
                            onSelect?.();
                          }}
                        >
                          <Icon className="lesson-icon" aria-hidden="true" />
                          <span className="lesson-title">
                            {lesson.title} <small>{lesson.kind}</small>
                          </span>
                          <span
                            className={`lesson-duration ${lesson.isDone ? "is-completed" : ""}`}
                          >
                            {formatMinutes(lesson.durationSec)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseContents;

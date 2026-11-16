import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { COURSE, PROGRESS } from "../data/courseData";

/*
 * Single source of truth for the course view.
 * CourseContents, CoursePlayer and NavProgress all read from here, so picking
 * a lesson or passing a quick check updates every one of them together.
 * Data comes from ../data/courseData.js (swap for an API call later).
 */

// "Reading", "Video + reading", "Project"
export const getLessonKind = (lesson) => {
  if (lesson.isProject) return "Project";
  return lesson.blocks.some((b) => b.type === "video")
    ? "Video + reading"
    : "Reading";
};

const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState(PROGRESS.lastLessonId);
  const [completedIds, setCompletedIds] = useState(
    () =>
      new Set(
        Object.entries(PROGRESS.lessons)
          .filter(([, v]) => v.status === "completed")
          .map(([id]) => id),
      ),
  );

  const value = useMemo(() => {
    const flat = COURSE.sections.flatMap((s, sectionIndex) =>
      s.lessons.map((l) => ({ ...l, sectionIndex, sectionTitle: s.title })),
    );

    // Sequential courses unlock lessons up to the first unfinished one
    const firstOpenIndex = flat.findIndex((l) => !completedIds.has(l.id));
    const sequential = COURSE.navigation === "sequential";

    const lessons = flat.map((l, index) => {
      const isDone = completedIds.has(l.id);
      const isCurrent = l.id === currentId;
      const isLocked =
        sequential && !isDone && firstOpenIndex !== -1 && index > firstOpenIndex;
      return {
        ...l,
        index,
        kind: getLessonKind(l),
        isDone,
        isCurrent,
        isLocked,
        status: isCurrent
          ? "current"
          : isDone
            ? "done"
            : isLocked
              ? "locked"
              : "todo",
      };
    });

    const sections = COURSE.sections.map((s, i) => ({
      ...s,
      index: i,
      lessons: lessons.filter((l) => l.sectionIndex === i),
    }));

    const totalSections = sections.length;

    const doneCount = lessons.filter((l) => l.isDone).length;
    const secondsLeft = lessons
      .filter((l) => !l.isDone)
      .reduce((sum, l) => sum + l.durationSec, 0);
    const current = lessons.find((l) => l.isCurrent) ?? lessons[0];

    // Progress inside the section the current lesson belongs to
    const currentSection = sections[current.sectionIndex];
    const sectionTotal = currentSection?.lessons.length ?? 0;
    const sectionDoneCount =
      currentSection?.lessons.filter((l) => l.isDone).length ?? 0;
    const sectionPercent = sectionTotal
      ? Math.round((sectionDoneCount / sectionTotal) * 100)
      : 0;

    return {
      course: COURSE,
      progress: PROGRESS,
      sections,
      lessons,
      current,
      currentSection,
      sectionDoneCount,
      sectionTotal,
      sectionPercent,
      currentSectionTitle: current.sectionTitle,
      prev: lessons[current.index - 1] ?? null,
      next: lessons[current.index + 1] ?? null,
      doneCount,
      totalSections,
      total: lessons.length,
      percent: lessons.length
        ? Math.round((doneCount / lessons.length) * 100)
        : 0,
      secondsLeft,
    };
  }, [currentId, completedIds]);

  const selectLesson = useCallback(
    (id) => {
      const target = value.lessons.find((l) => l.id === id);
      if (!target || target.isLocked) return;
      setCurrentId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [value.lessons],
  );

  const markDone = useCallback(
    (id) => setCompletedIds((prev) => new Set(prev).add(id)),
    [],
  );

  // Mark the current lesson done and move on in one step (the next lesson is
  // still locked in this render, so selectLesson alone would refuse it).
  const completeAndNext = useCallback(() => {
    setCompletedIds((prev) => new Set(prev).add(value.current.id));
    if (value.next) {
      setCurrentId(value.next.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [value]);

  const ctx = useMemo(
    () => ({ ...value, selectLesson, markDone, completeAndNext }),
    [value, selectLesson, markDone, completeAndNext],
  );

  return <CourseContext.Provider value={ctx}>{children}</CourseContext.Provider>;
};

export const useCourse = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used inside <CourseProvider>");
  return ctx;
};

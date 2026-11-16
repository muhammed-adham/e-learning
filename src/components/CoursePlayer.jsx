import React, { useEffect, useRef, useState } from "react";
import "../styles/components/coursePlayer.css";
import {
  MdChevronLeft,
  MdChevronRight,
  MdClosedCaption,
  MdDownload,
  MdFullscreen,
  MdInfoOutline,
  MdLightbulbOutline,
  MdOpenInNew,
  MdPause,
  MdPlayArrow,
  MdWarningAmber,
} from "react-icons/md";
import { useCourse } from "../context/CourseContext";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import ExamPlayer from "./ExamPlayer";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */
const formatClock = (sec) => {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const formatMinutes = (sec) => `${Math.max(1, Math.round(sec / 60))} min`;

const formatMonthYear = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

// Tiny inline markdown: **bold** and `code`
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });

/* -------------------------------------------------------------------------- */
/*                                CONTENT BLOCKS                              */
/* -------------------------------------------------------------------------- */
const TextBlock = ({ body }) => (
  <div className="cp-text">
    {body.split("\n\n").map((para, i) => {
      const lines = para.split("\n");
      const isList = lines.every((l) => l.startsWith("- "));

      return isList ? (
        <ul key={i}>
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.slice(2))}</li>
          ))}
        </ul>
      ) : (
        <p key={i}>{renderInline(para)}</p>
      );
    })}
  </div>
);

const CALLOUT_ICON = {
  info: MdInfoOutline,
  tip: MdLightbulbOutline,
  warning: MdWarningAmber,
};

const CalloutBlock = ({ variant = "info", title, body }) => {
  const Icon = CALLOUT_ICON[variant] ?? MdInfoOutline;
  return (
    <aside className={`cp-callout cp-callout-${variant}`}>
      <Icon className="cp-callout-icon" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{renderInline(body)}</p>
      </div>
    </aside>
  );
};

const ImageBlock = ({ url, alt, caption }) => (
  <figure className="cp-figure">
    <img src={url} alt={alt} loading="lazy" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

/* ---- Video: simulated player (the sample URLs are not real streams) ---- */
const SPEEDS = [1, 1.25, 1.5, 2];

const VideoBlock = ({
  poster,
  durationSec,
  chapters = [],
  resumeAtSec = 0,
}) => {
  const [position, setPosition] = useState(resumeAtSec);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [captions, setCaptions] = useState(false);
  const wrapRef = useRef(null);

  // Advance the playhead while "playing"
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPosition((p) => {
        if (p + speed >= durationSec) {
          setPlaying(false);
          return durationSec;
        }
        return p + speed;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, speed, durationSec]);

  const activeChapter = chapters.reduce(
    (acc, c, i) => (position >= c.atSec ? i : acc),
    0,
  );
  const percent = (position / durationSec) * 100;
  const showResume = !playing && resumeAtSec > 0 && position === resumeAtSec;

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width),
    );
    setPosition(ratio * durationSec);
  };

  const cycleSpeed = () =>
    setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length]);

  const fullscreen = () => wrapRef.current?.requestFullscreen?.();

  return (
    <div className="cp-video-block">
      <div
        className="cp-video"
        ref={wrapRef}
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="cp-video-shade" />

        <button
          type="button"
          className="cp-video-big-play"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <MdPause /> : <MdPlayArrow />}
        </button>

        {showResume && (
          <span className="cp-video-resume">
            Resume from {formatClock(position)}
          </span>
        )}

        <div className="cp-video-controls">
          <div
            className="cp-video-track"
            onClick={seek}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={durationSec}
            aria-valuenow={Math.floor(position)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight")
                setPosition((p) => Math.min(durationSec, p + 5));
              if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
            }}
          >
            <span className="cp-video-fill" style={{ width: `${percent}%` }} />
            {chapters.slice(1).map((c) => (
              <i
                key={c.atSec}
                className="cp-video-tick"
                style={{ left: `${(c.atSec / durationSec) * 100}%` }}
              />
            ))}
          </div>

          <div className="cp-video-bar">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <MdPause /> : <MdPlayArrow />}
            </button>
            <span className="cp-video-time">
              {formatClock(position)} / {formatClock(durationSec)}
            </span>
            <span className="cp-video-spacer" />
            <button
              type="button"
              className={`cp-video-cc${captions ? " is-on" : ""}`}
              aria-pressed={captions}
              aria-label="Captions"
              onClick={() => setCaptions((c) => !c)}
            >
              <MdClosedCaption />
            </button>
            <button
              type="button"
              className="cp-video-speed"
              onClick={cycleSpeed}
              aria-label="Playback speed"
            >
              {speed}x
            </button>
            <button type="button" aria-label="Fullscreen" onClick={fullscreen}>
              <MdFullscreen />
            </button>
          </div>
        </div>
      </div>

      {chapters.length > 0 && (
        <div className="cp-chapters">
          <h6>Chapters</h6>
          <div className="cp-chapter-grid">
            {chapters.map((c, i) => (
              <button
                key={c.atSec}
                type="button"
                className={`cp-chapter${i === activeChapter ? " is-active" : ""}`}
                onClick={() => setPosition(c.atSec)}
              >
                <span>{formatClock(c.atSec)}</span>
                {c.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Resources = ({ items }) => (
  <section className="cp-resources">
    <h6>Resources</h6>
    <div className="cp-resource-grid">
      {items.map((r) => {
        const isFile = r.type === "zip";
        const Icon = isFile ? MdDownload : MdOpenInNew;
        const meta = isFile ? `ZIP · ${r.sizeKb} KB` : new URL(r.url).hostname;
        return (
          <a
            key={r.id}
            className="cp-resource"
            href={r.url}
            {...(isFile
              ? { download: true }
              : { target: "_blank", rel: "noreferrer" })}
          >
            <Icon aria-hidden="true" />
            <span>
              <strong>{r.title}</strong>
              <small>{meta}</small>
            </span>
          </a>
        );
      })}
    </div>
  </section>
);

/* ---- Quick check (quiz) ---- */
const Checkpoint = ({ checkpoint, saved, onPassed }) => {
  const [selected, setSelected] = useState(saved?.selectedOptionId ?? null);
  const [result, setResult] = useState(
    saved ? (saved.isCorrect ? "correct" : "wrong") : null,
  );

  const check = () => {
    const ok = selected === checkpoint.correctOptionId;
    setResult(ok ? "correct" : "wrong");
    if (ok)
      (onPassed(),
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        }));
  };

  const locked = result === "correct";

  return (
    <section className="cp-quiz">
      <div className="cp-quiz-head">
        <span className="cp-quiz-tag">Quick check</span>
        <small>Answer to finish this lesson</small>
      </div>
      <h4>{checkpoint.question}</h4>

      <div
        className="cp-quiz-options"
        role="radiogroup"
        aria-label={checkpoint.question}
      >
        {checkpoint.options.map((o) => {
          const state =
            locked && o.id === checkpoint.correctOptionId
              ? " is-correct"
              : result === "wrong" && o.id === selected
                ? " is-wrong"
                : "";
          return (
            <label
              key={o.id}
              className={`cp-quiz-option${selected === o.id ? " is-selected" : ""}${state}`}
            >
              <input
                type="radio"
                name="checkpoint"
                value={o.id}
                checked={selected === o.id}
                disabled={locked}
                onChange={() => {
                  setSelected(o.id);
                  setResult(null);
                }}
              />
              <span className="cp-radio" aria-hidden="true" />
              {o.text}
            </label>
          );
        })}
      </div>

      {result && (
        <p className={`cp-quiz-feedback is-${result}`} role="status">
          <strong>
            {result === "correct" ? "Correct. " : "Not quite. Try again. "}
          </strong>
          {result === "correct" && checkpoint.explanation}
        </p>
      )}

      {!locked && (
        <button
          type="button"
          className="cp-btn-primary"
          disabled={!selected}
          onClick={check}
        >
          Check answer
        </button>
      )}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                                COURSE PLAYER                               */
/* -------------------------------------------------------------------------- */
const CoursePlayer = () => {
  const {
    course,
    progress,
    lessons,
    current: lesson,
    prev,
    next,
    selectLesson,
    markDone,
    completeAndNext,
  } = useCourse();

  /* -------------------------------------------------------------------------- */
  /*                                Player Switcher Course/Exame                               */
  /* -------------------------------------------------------------------------- */
  // console.log(lesson.exam);
  
  if (lesson.isProject) return <ExamPlayer exam={lesson?.exam}/>;

  const index = lesson.index;
  const isDone = lesson.isDone;
  const saved = progress.lessons[lesson.id]?.checkpoint;
  const needsCheck = Boolean(lesson.checkpoint) && !isDone;

  return (
    <article className="course-player">
      <header className="cp-header">
        <p className="cp-eyebrow">
          Section {lesson.sectionIndex + 1} · Lesson {index + 1} of{" "}
          {lessons.length}
        </p>
        <h2 className="cp-title">{lesson.title}</h2>
        <p className="cp-meta">
          <span>{lesson.kind} </span> |
          <span>{formatMinutes(lesson.durationSec)}</span> |
          <span>Updated {formatMonthYear(course.updatedAt)}</span>
          {isDone && (
            <span className="cp-done">
              <HiMiniDocumentCheck aria-hidden="true" /> Completed
            </span>
          )}
        </p>
      </header>

      {/* key resets video/quiz state when the lesson changes */}
      <div className="cp-body" key={lesson.id}>
        {lesson.blocks.map((b, i) => {
          switch (b.type) {
            case "text":
              return <TextBlock key={i} body={b.body} />;
            case "callout":
              return <CalloutBlock key={i} {...b} />;
            case "image":
              return <ImageBlock key={i} {...b} />;
            case "video":
              return (
                <VideoBlock
                  key={i}
                  poster={b.poster}
                  durationSec={b.durationSec}
                  chapters={b.chapters}
                  resumeAtSec={
                    progress.lessons[lesson.id]?.videoPositionSec <
                    b.durationSec
                      ? progress.lessons[lesson.id]?.videoPositionSec
                      : 0
                  }
                />
              );
            default:
              return null;
          }
        })}

        {lesson.resources?.length > 0 && <Resources items={lesson.resources} />}

        {lesson.checkpoint && (
          <Checkpoint
            checkpoint={lesson.checkpoint}
            saved={saved}
            onPassed={() => markDone(lesson.id)}
          />
        )}
      </div>

      <footer className="cp-footer">
        {prev ? (
          <button
            type="button"
            className="cp-prev"
            onClick={() => selectLesson(prev.id)}
          >
            <MdChevronLeft aria-hidden="true" />
            {prev.title}
          </button>
        ) : (
          <span />
        )}

        <div className="cp-next-wrap">
          {needsCheck && <small>Answer the quick check to unlock</small>}
          {next ? (
            <button
              type="button"
              className="cp-btn-outline"
              disabled={needsCheck}
              onClick={completeAndNext}
            >
              Next lesson <MdChevronRight aria-hidden="true" />
            </button>
          ) : (
            !isDone && (
              <button
                type="button"
                className="cp-btn-primary"
                disabled={needsCheck}
                onClick={() => markDone(lesson.id)}
              >
                Finish course
              </button>
            )
          )}
        </div>
      </footer>
    </article>
  );
};

export default CoursePlayer;

import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../styles/components/timeframeDropdown.css";

const DEFAULT_OPTIONS = [
  { value: 30, label: "30 days" },
  { value: 60, label: "60 days" },
  { value: 90, label: "90 days" },
  { value: 180, label: "180 days" },
  { value: 365, label: "365 days" },
];

const TimeframeDropdown = ({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); // keyboard-highlighted index
  const rootRef = useRef(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selected = options[selectedIndex];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const toggle = () => {
    setActive(selectedIndex);
    setOpen((o) => !o);
  };

  const choose = (opt) => {
    onChange?.(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return toggle();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
    }
    if (open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      choose(options[active]);
    }
  };

  return (
    <div
      className={`timeframe-dropdown${open ? " is-open" : ""}`}
      ref={rootRef}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="timeframe-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
      >
        <span>{selected?.label}</span>
        <MdKeyboardArrowDown className="timeframe-arrow" aria-hidden="true" />
      </button>

      <ul className="timeframe-menu" role="listbox" hidden={!open}>
        {options.map((opt, i) => (
          <li
            key={opt.value}
            role="option"
            aria-selected={opt.value === selected?.value}
            className={`timeframe-option${i === active ? " is-active" : ""}${
              opt.value === selected?.value ? " is-selected" : ""
            }`}
            onMouseEnter={() => setActive(i)}
            onClick={() => choose(opt)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeframeDropdown;

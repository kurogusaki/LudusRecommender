"use client";

import { useEffect, useRef, useState } from "react";
import {CONTROL} from "@/components/games/GamesList";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  const displayText =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
      ? selected.join(", ")
      : `${selected.slice(0, 2).join(", ")} +${selected.length - 2}`;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
            width: "100%",
            height: CONTROL.height,
            padding: `0 ${CONTROL.paddingX}`,
            fontSize: CONTROL.fontSize,
            borderRadius: CONTROL.radius,
            fontFamily: "var(--font-body), sans-serif",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayText}
        </span>

        <svg
  width="12"
  height="12"
  viewBox="0 0 24 24"
  fill="none"
  style={{
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease",
    flexShrink: 0,
  }}
>
  <path
    d="M7 10L12 15L17 10"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            borderRadius: CONTROL.radius,
            top: "calc(100% + 0.35rem)",
            left: 0,
            right: 0,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          {options.map((option) => (
            <label
              key={option}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.65rem 0.9rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
              />

              {option}
            </label>
          ))}

                {selected.length > 0 && (
        <button
            type="button"
            onClick={() => onChange([])}
            style={{
            width: "100%",
            padding: "0.75rem",
            border: "none",
            borderTop: "1px solid var(--border)",
            background: "transparent",
            color: "var(--accent)",
            cursor: "pointer",
            fontFamily: "var(--font-ui), sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.7rem",
            }}
        >
            Clear All
        </button>
        )}

        </div>
      )}
    </div>
  );
}
interface BadgeProps {
  label: string;
  color?: string;
  borderColor?: string;

  active?: boolean;
  onClick?: () => void;
}

export default function Badge({
  label,
  color,
  borderColor,
  active = false,
  onClick,
}: BadgeProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-ui), sans-serif",
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",

        color: active ? "var(--background)" : color ?? "var(--muted)",

        background: active ? "var(--accent)" : "transparent",

        border: `1px solid ${
          active ? "var(--accent)" : borderColor ?? "var(--border)"
        }`,

        padding: "0.15rem 0.5rem",

        cursor: "pointer",

        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
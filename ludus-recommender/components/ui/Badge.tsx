interface BadgeProps {
  label: string;
  color?: string;
  borderColor?: string;
}

export default function Badge({ label, color, borderColor }: BadgeProps) {
  return (
    <span style={{
      fontFamily: "var(--font-ui), sans-serif",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: color ?? "var(--muted)",
      border: `1px solid ${borderColor ?? "var(--border)"}`,
      padding: "0.15rem 0.5rem",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}
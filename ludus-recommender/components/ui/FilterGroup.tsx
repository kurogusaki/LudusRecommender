interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterGroup({
  title,
  children,
}: FilterGroupProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {title}
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}
interface PageHeaderProps {
  eyebrow?: string;      // small label above title e.g. "Catalogue"
  title: string;
  subtitle?: string;
  right?: React.ReactNode; // optional right-side content e.g. a count badge
}

export default function PageHeader({ eyebrow, title, subtitle, right }: PageHeaderProps) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <div>
        {eyebrow && (
          <p style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}>
            {eyebrow}
          </p>
        )}
        <h1 style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "var(--text)",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: "1rem",
            color: "var(--muted)",
            marginTop: "0.5rem",
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}
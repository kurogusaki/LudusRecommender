interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No Results Found",
  message = "Nothing to display here yet.",
}: EmptyStateProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 2rem",
      gap: "1.5rem",
      border: "1px dashed var(--border)",
      background: "var(--surface)",
    }}>
      <div style={{
        width: "64px",
        height: "64px",
        border: "2px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg
          width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="var(--muted)"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M7 12h.01" />
          <path d="M17 12h.01" />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "1.25rem",
          color: "var(--text)",
          letterSpacing: "0.1em",
          marginBottom: "0.5rem",
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.9rem",
          color: "var(--muted)",
          maxWidth: "28rem",
          lineHeight: 1.7,
        }}>
          {message}
        </p>
      </div>
    </div>
  );
}
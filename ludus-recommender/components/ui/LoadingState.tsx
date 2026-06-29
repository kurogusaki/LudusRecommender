interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "6rem 2rem",
      gap: "1.5rem",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "2px solid var(--border)",
        borderTop: "2px solid var(--accent)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{
        fontFamily: "var(--font-ui), sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}>
        {message}
      </span>
    </div>
  );
}   
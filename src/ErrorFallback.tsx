// src/ErrorFallback.tsx
// Rendered by an ErrorBoundary when a descendant component throws.

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      style={{
        padding: "1.5rem",
        borderRadius: "0.75rem",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#991b1b",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ margin: "0 0 0.5rem", fontSize: "1rem", fontWeight: 700 }}>
        ⚠️ Something went wrong
      </h2>
      <pre
        style={{
          margin: "0 0 1rem",
          fontSize: "0.8rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          opacity: 0.8,
        }}
      >
        {error.message}
      </pre>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "0.4rem",
            background: "#991b1b",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

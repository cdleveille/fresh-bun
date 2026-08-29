import type { ErrorComponentProps } from "@tanstack/react-router";

export const ErrorBoundary = ({ error, reset }: Partial<ErrorComponentProps>) => {
  const message = getErrorMessage(error);

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "2rem",
        padding: "1rem",
      }}
    >
      <h1>Error!</h1>
      <div style={{ color: "red", fontFamily: "monospace", fontSize: "1rem" }}>{message}</div>
      <div style={{ display: "flex", columnGap: "2rem" }}>
        {reset && (
          <button type="button" className="link-btn" onClick={reset}>
            Try again
          </button>
        )}
        <a href="/">Home</a>
      </div>
    </div>
  );
};

export const NotFound = () => <ErrorBoundary error={new Error("Not Found")} />;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") return error.message;
    if ("error" in error && typeof error.error === "string") return error.error;
  }
  return "An unknown error occurred.";
};

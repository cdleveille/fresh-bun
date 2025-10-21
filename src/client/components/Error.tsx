export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "2rem",
        padding: "0 1rem",
      }}
    >
      <h1>Error!</h1>
      <div style={{ color: "red", fontFamily: "monospace", fontSize: "1rem" }}>{error.message}</div>
      <a href="/">Home</a>
    </div>
  );
};

export const NotFound = () => <ErrorBoundary error={new Error("Not Found")} />;

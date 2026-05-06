export const ErrorBoundary = ({ error }: { error: unknown }) => {
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
        padding: "0 1rem",
      }}
    >
      <h1>Error!</h1>
      <div style={{ color: "red", fontFamily: "monospace", fontSize: "1rem" }}>{message}</div>
      <a href="/">Home</a>
    </div>
  );
};

export const NotFound = () => <ErrorBoundary error={new Error("Not Found")} />;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    if ("message" in error) return String((error as { message: unknown }).message);
    if ("error" in error && typeof (error as { error: unknown }).error === "string")
      return (error as { error: string }).error;
  }
  return "An unknown error occurred.";
};

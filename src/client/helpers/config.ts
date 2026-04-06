export const Config = {
  IS_PROD: import.meta.env.MODE === "production",
  PORT: Number(import.meta.env.PORT ?? window.location.port),
};

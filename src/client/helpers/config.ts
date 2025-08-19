import { Env } from "@/shared/constants";

export const Config = {
  IS_PROD: import.meta.env.MODE === Env.Production,
  PORT: Number(import.meta.env.PORT ?? window.location.port),
};

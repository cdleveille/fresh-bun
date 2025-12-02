import { type ErrorHandler, ValidationError } from "elysia";

import { ErrorMessage } from "@/shared/constants";

export const handleError: ErrorHandler = ({ error }) => {
  if (error instanceof ValidationError) {
    const message = error.all.map(e => e.summary).join(", ");
    return { message };
  }
  if (typeof error === "object" && error !== null) {
    if ("message" in error) return { message: error.message };
    if ("error" in error) return { message: error.error };
  }
  if (typeof error === "string") return { message: error };
  return { message: ErrorMessage._500 };
};

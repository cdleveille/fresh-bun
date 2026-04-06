import { z } from "zod";

export const parseSchema = <T>(schema: z.ZodType<T>, data: unknown) =>
  schema.parse(JSON.parse(data as string));

export const messageSchema = z.object({ message: z.string() });

export const messageOptionalSchema = z.object({ message: z.string().optional() });

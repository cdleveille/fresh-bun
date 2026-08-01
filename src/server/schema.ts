import { z } from "zod";

export const messageSchema = z.object({ message: z.string() });

export const messageOptionalSchema = z.object({ message: z.string().optional() });

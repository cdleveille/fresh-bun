import { z } from "zod";

export const messageSchema = z.object({ message: z.string() });

export const messageOptionalSchema = z.object({ message: z.string().optional() });

type TMessage = z.infer<typeof messageSchema>;

export type TClientToServerEvents = {
  hello: (data: TMessage, callback: (res: TMessage) => void) => void;
};

export type TServerToClientEvents = Record<string, never>;

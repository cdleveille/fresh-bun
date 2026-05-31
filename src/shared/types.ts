import type { z } from "zod";

import type { api } from "@/server/api";
import type { messageSchema } from "@/server/schema";

export type TApi = typeof api;

export type TAppContext = null;

export type TCountStore = {
  count: number;
  minusCount: () => void;
  plusCount: () => void;
};

export type TReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type TMessageRes = z.infer<typeof messageSchema>;

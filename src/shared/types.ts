import type { WebSocketData } from "@socket.io/bun-engine";

import type { api } from "@/server/api";

export type TApi = typeof api;

export type TAppEnv = { Bindings: Bun.Server<WebSocketData> };

export type TAppContext = null;

export type TCountStore = {
  count: number;
  minusCount: () => void;
  plusCount: () => void;
};

export type TReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

import type { WebSocketData } from "@socket.io/bun-engine";

import type { api } from "@/server/api";

export type TApi = typeof api;

export type TAppEnv = { Bindings: Bun.Server<WebSocketData> };

export type TThemeMode = "light" | "dark" | "system";

export type TTheme = {
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
  resolvedTheme: "light" | "dark";
};

export type TAppContext = {
  theme: TTheme;
};

export type TCountStore = {
  count: number;
  minusCount: () => void;
  plusCount: () => void;
};

export type TThemeStore = {
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
};

export type TReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

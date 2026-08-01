import type { api } from "@/server/api";

export type TApi = typeof api;

export type TAppContext = null;

export type TCountStore = {
  count: number;
  minusCount: () => void;
  plusCount: () => void;
};

export type TReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

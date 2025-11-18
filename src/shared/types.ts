import type { Static, TSchema } from "elysia";

import type { api } from "@/server/api";

export type TApi = typeof api;

export type TAppContext = null;

export type TCountStore = {
  count: number;
  minusCount: () => void;
  plusCount: () => void;
};

export type TTreatyHandler<TSend, TReceive> = {
  subscribe: () => {
    send: (sendData: TSend) => void;
    on: (
      event: "message",
      callback: (receiveData: { data: TReceive; isTrusted: boolean }) => void,
    ) => void;
    close: () => void;
  };
};

export type TOnSuccess<TReceive extends TSchema> = (data: Static<TReceive>) => void;

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

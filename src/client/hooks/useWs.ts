import { useEffect, useRef } from "react";
import type { TTreatyHandler } from "@/shared/types";

export const useWs = <TSend, TReceive>({
  handler,
  onSuccess,
  body,
}: {
  handler: TTreatyHandler<TSend, TReceive>;
  onSuccess: ({ data }: { data: TReceive }) => void;
  body?: TSend;
}) => {
  const wsRef = useRef<ReturnType<typeof handler.subscribe> | null>(null);
  const handlerRef = useRef(handler);
  const onSuccessRef = useRef(onSuccess);

  const send = (data?: TSend) => {
    try {
      if (!wsRef?.current) throw new Error("Not connected");
      wsRef.current.send((data ?? body) as TSend);
    } catch (error) {
      console.error("WebSocket send failed:", error);
    }
  };

  useEffect(() => {
    const connection = handlerRef.current.subscribe();
    wsRef.current = connection;

    connection.on("message", res => onSuccessRef.current(res));

    return () => {
      connection.close();
      wsRef.current = null;
    };
  }, []);

  return { send, subscribe: handler.subscribe };
};

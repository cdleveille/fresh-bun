import { useLoaderData } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

import { useGetHello, usePostHello, useWsHello } from "@/client/hooks/useApi";
import { useCountStore } from "@/client/hooks/useCountStore";

export const Home = () => {
  const { message } = useLoaderData({ from: "/" });

  const { mutate: getHello } = useGetHello({
    query: { message: "hello from client!" },
    onSuccess: ({ message }) => toast.success(message),
  });

  const { mutate: postHello } = usePostHello({
    body: { message: "hello from client!" },
    onSuccess: ({ message }) => toast.success(message),
  });

  const { send: wsHello } = useWsHello({
    body: { message: "hello from client!" },
    onSuccess: ({ message }) => toast.success(message),
  });

  const { count, minusCount, plusCount } = useCountStore();

  return (
    <main>
      <h1>{message.slice(5)}</h1>
      <div className="row" style={{ scale: 1.5 }}>
        <button type="button" onClick={minusCount}>
          -
        </button>
        <div className="count">{count}</div>
        <button type="button" onClick={plusCount}>
          +
        </button>
      </div>
      <div className="row gap">
        <button type="button" onClick={() => getHello()}>
          GET
        </button>
        <button type="button" onClick={() => postHello()}>
          POST
        </button>
        <button type="button" onClick={() => wsHello()}>
          WS
        </button>
      </div>
    </main>
  );
};

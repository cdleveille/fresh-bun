import { useLoaderData } from "@tanstack/react-router";

import BunLogo from "@/client/assets/bun.svg";
import { useHttpHello, useWsHello } from "@/client/hooks/useApi";
import { useCountStore } from "@/client/hooks/useCountStore";

export const Home = () => {
  const { message } = useLoaderData({ from: "/" });

  const { mutate: httpHello } = useHttpHello();

  const { send: wsHello } = useWsHello();

  const { count, minusCount, plusCount } = useCountStore();

  return (
    <main>
      <h1>{message.slice(5)}</h1>
      <BunLogo width={250} height={225} />
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
        <button type="button" onClick={() => httpHello()}>
          HTTP
        </button>
        <button type="button" onClick={() => wsHello()}>
          WS
        </button>
      </div>
    </main>
  );
};

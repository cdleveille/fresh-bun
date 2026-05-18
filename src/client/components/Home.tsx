import { useSuspenseQuery } from "@tanstack/react-query";

import BunLogo from "@/client/assets/bun.svg";
import { helloQueryOptions, useHttpHello, useWsHello } from "@/client/hooks/useApi";
import { useCountStore } from "@/client/hooks/useCountStore";

export const Home = () => {
  const {
    data: { message },
  } = useSuspenseQuery(helloQueryOptions);

  const { mutate: httpHello } = useHttpHello();
  const { mutate: wsHello } = useWsHello();

  const { count, minusCount, plusCount } = useCountStore();

  return (
    <main>
      <h1>{message}</h1>
      <BunLogo className="logo" width={250} height={225} />
      <div className="counter">
        <button type="button" className="counter-btn" onClick={minusCount}>
          −
        </button>
        <div className="count">{count}</div>
        <button type="button" className="counter-btn" onClick={plusCount}>
          +
        </button>
      </div>
      <div className="api-row">
        <button type="button" className="api-btn" onClick={() => httpHello()}>
          HTTP
        </button>
        <button type="button" className="api-btn" onClick={() => wsHello()}>
          WS
        </button>
      </div>
    </main>
  );
};

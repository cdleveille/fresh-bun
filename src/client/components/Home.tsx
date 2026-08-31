import BunLogo from "@/client/assets/bun.svg";
import { useHello, useHttpHello, useWsHello } from "@/client/hooks/useApi";
import { useCount } from "@/client/hooks/useCount";

export const Home = () => {
  const { data } = useHello();

  const { mutate: httpHello } = useHttpHello();
  const { mutate: wsHello } = useWsHello();

  const { count, minusCount, plusCount } = useCount();

  return (
    <main>
      <h1>{data.message}</h1>
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

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiClient } from "@/client/helpers/network";

const sendWsRequest = <TResponse>(
  createWs: () => WebSocket,
  message: unknown,
): Promise<TResponse> =>
  new Promise((resolve, reject) => {
    const ws = createWs();
    ws.onopen = () => ws.send(JSON.stringify(message));
    ws.onmessage = event => {
      resolve(JSON.parse(event.data) as TResponse);
      ws.close();
    };
    ws.onerror = reject;
  });

export const useHttpHello = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.http.hello.$post({ json: { message: "hello from client!" } });
      const data = await res.json();
      return data;
    },
    onSuccess: ({ message }) => toast.success(`HTTP: ${message}`),
  });
};

export const useWsHello = () => {
  return useMutation({
    mutationFn: () =>
      sendWsRequest<{ message: string }>(() => apiClient.ws.hello.$ws(), {
        message: "hello from client!",
      }),
    onSuccess: ({ message }) => toast.success(`WS: ${message}`),
  });
};

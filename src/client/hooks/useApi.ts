import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiClient } from "@/client/helpers/network";

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
    mutationFn: () => {
      return new Promise<{ message: string }>((resolve, reject) => {
        const ws = apiClient.ws.hello.$ws();
        ws.onopen = () => ws.send(JSON.stringify({ message: "hello from client!" }));
        ws.onmessage = event => {
          resolve(JSON.parse(event.data));
          ws.close();
        };
        ws.onerror = reject;
      });
    },
    onSuccess: ({ message }) => toast.success(`WS: ${message}`),
  });
};

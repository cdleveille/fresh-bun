import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiClient, sendWsRequest } from "@/client/helpers/network";
import type { TMessageRes } from "@/shared/types";

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
      return sendWsRequest<TMessageRes>(() => apiClient.ws.hello.$ws(), {
        message: "hello from client!",
      });
    },
    onSuccess: ({ message }) => toast.success(`WS: ${message}`),
  });
};

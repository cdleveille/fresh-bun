import { queryOptions, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getErrorMessage } from "@/client/components/Error";
import { apiClient, socket } from "@/client/helpers/network";

export const helloQueryOptions = queryOptions({
  queryKey: ["hello"],
  queryFn: async () => {
    const res = await apiClient.http.hello.$get({ query: { message: "hello from client!" } });
    return res.json();
  },
});

export const useHello = () => useSuspenseQuery(helloQueryOptions);

export const useHttpHello = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.http.hello.$post({ json: { message: "hello from client!" } });
      return res.json();
    },
    onSuccess: ({ message }) => toast.success(`HTTP: ${message}`),
    onError: error => toast.error(`HTTP: ${getErrorMessage(error)}`),
  });
};

export const useWsHello = () => {
  return useMutation({
    mutationFn: () => socket.emitWithAck("hello", { message: "hello from client!" }),
    onSuccess: ({ message }) => toast.success(`WS: ${message}`),
    onError: error => toast.error(`WS: ${getErrorMessage(error)}`),
  });
};

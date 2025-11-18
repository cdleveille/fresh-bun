import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";

export const useHttpHello = () => {
  return useMutation({
    mutationFn: () => apiClient.http.hello.post({ message: "hello from client!" }),
    onSuccess: ({ data, error }) => {
      if (error) throw new Error(error.value.message);
      toast.success(`HTTP: ${data.message}`);
    },
  });
};

export const useWsHello = () => {
  return useWs({
    handler: apiClient.ws.hello,
    onSuccess: ({ data }) => {
      const { message } = data;
      toast.success(`WS: ${message}`);
    },
    body: { message: "hello from client!" },
  });
};

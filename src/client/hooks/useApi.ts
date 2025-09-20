import { useMutation } from "@tanstack/react-query";
import type { Static } from "elysia";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";
import type { schema } from "@/shared/schema";
import type { TOnSuccess } from "@/shared/types";

export const useGetHello = ({
  query,
  onSuccess,
}: {
  query: Static<typeof schema.api.hello.get.query>;
  onSuccess: TOnSuccess<(typeof schema.api.hello.get.response)[200]>;
}) => {
  return useMutation({
    mutationFn: () => apiClient.http.hello.get({ query }),
    onSuccess: ({ data }) => data && onSuccess(data),
  });
};

export const usePostHello = ({
  body,
  onSuccess,
}: {
  body: Static<typeof schema.api.hello.post.body>;
  onSuccess: TOnSuccess<(typeof schema.api.hello.post.response)[200]>;
}) => {
  return useMutation({
    mutationFn: () => apiClient.http.hello.post(body),
    onSuccess: ({ data }) => data && onSuccess(data),
  });
};

export const useWsHello = ({
  body,
  onSuccess,
}: {
  body: Static<typeof schema.api.hello.ws.body>;
  onSuccess: TOnSuccess<typeof schema.api.hello.ws.response>;
}) => {
  return useWs({
    handler: apiClient.ws.hello,
    onSuccess: ({ data }) => data && onSuccess(data[200]),
    body,
  });
};

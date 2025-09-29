import { useMutation } from "@tanstack/react-query";
import type { Static } from "elysia";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";
import type { apiSchema } from "@/shared/schema";
import type { TOnSuccess } from "@/shared/types";

export const useGetHello = ({
  query,
  onSuccess,
}: {
  query: Static<typeof apiSchema.hello.get.query>;
  onSuccess: TOnSuccess<(typeof apiSchema.hello.get.response)[200]>;
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
  body: Static<typeof apiSchema.hello.post.body>;
  onSuccess: TOnSuccess<(typeof apiSchema.hello.post.response)[200]>;
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
  body: Static<typeof apiSchema.hello.ws.body>;
  onSuccess: TOnSuccess<typeof apiSchema.hello.ws.response>;
}) => {
  return useWs({
    handler: apiClient.ws.hello,
    // biome-ignore lint/suspicious/noExplicitAny: runtime data structure doesn't match inferred type
    onSuccess: ({ data }) => data && onSuccess(data as any),
    body,
  });
};

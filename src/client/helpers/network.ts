import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/shared/types";

const httpBase = `${location.origin}/api`;

const wsBase = Config.IS_PROD ? httpBase : `http://localhost:${import.meta.env.PORT}/api`;

export const apiClient = { http: hc<TApi>(httpBase), ws: hc<TApi>(wsBase).ws };

export const queryClient = new QueryClient();

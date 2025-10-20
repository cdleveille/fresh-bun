import { createContext } from "react";

import type { TAppContext } from "@/shared/types";

export const AppContext = createContext<TAppContext | null>(null);

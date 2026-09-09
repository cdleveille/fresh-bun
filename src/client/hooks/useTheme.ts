import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TThemeStore } from "@/shared/types";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, setTheme };
};

const useThemeStore = create<TThemeStore>()(
  persist(
    set => ({
      theme: getSystemTheme(),
      setTheme: theme => set({ theme }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

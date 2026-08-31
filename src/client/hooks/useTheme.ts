import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TThemeStore } from "@/shared/types";

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  // Resolve "system" against the live OS preference, and keep it live if the OS preference changes mid-session.
  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => setResolvedTheme(media.matches ? "light" : "dark");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  return { theme, resolvedTheme, setTheme };
};

const useThemeStore = create<TThemeStore>()(
  persist(
    set => ({
      theme: "system",
      setTheme: theme => set({ theme }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

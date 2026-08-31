import { toast } from "react-hot-toast";

import { useApp } from "@/client/hooks/useApp";
import type { TThemeMode } from "@/shared/types";

const NEXT_THEME: Record<TThemeMode, TThemeMode> = {
  system: "light",
  light: "dark",
  dark: "system",
};
const THEME_ICON: Record<TThemeMode, string> = { system: "◐", light: "☀", dark: "☾" };

export const Theme = () => {
  const { theme } = useApp();

  const cycleTheme = () => {
    const next = NEXT_THEME[theme.theme];
    theme.setTheme(next);
    toast.success(`Theme: ${next}`);
  };

  return (
    <button
      type="button"
      className="theme-cycle"
      onClick={cycleTheme}
      aria-label={`Theme: ${theme.theme}`}
      title={`Theme: ${theme.theme}`}
    >
      <span
        className={`theme-cycle-icon${theme.theme === "system" ? " theme-cycle-icon--system" : ""}`}
      >
        {THEME_ICON[theme.theme]}
      </span>
    </button>
  );
};

import { toast } from "react-hot-toast";

import { useApp } from "@/client/hooks/useApp";

export const Theme = () => {
  const { theme, setTheme } = useApp().theme;

  const cycleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    toast.success(`Theme: ${next}`);
  };

  return (
    <button
      type="button"
      className="theme-cycle"
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <span className="theme-toggle-icon">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
};

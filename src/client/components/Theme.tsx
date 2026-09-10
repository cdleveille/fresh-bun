import { toast } from "react-hot-toast";

import { useApp } from "@/client/hooks/useApp";

export const Theme = () => {
  const { theme, setTheme } = useApp().theme;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Theme: ${newTheme}`);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <span className="theme-toggle-icon">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
};

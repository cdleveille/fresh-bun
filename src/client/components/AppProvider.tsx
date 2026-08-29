import { AppContext } from "@/client/helpers/context";
import { useTheme } from "@/client/hooks/useTheme";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return <AppContext.Provider value={{ theme }}>{children}</AppContext.Provider>;
};

import { AppContext } from "@/client/helpers/context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
};

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TCountStore } from "@/shared/types";

export const useCountStore = create<TCountStore>()(
  persist(
    set => ({
      count: 0,
      minusCount: () => set(state => ({ count: state.count - 1 })),
      plusCount: () => set(state => ({ count: state.count + 1 })),
    }),
    {
      name: "count-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

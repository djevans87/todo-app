import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      access: false,
      allowAccess: () => set({ access: true }),
      removeAccess: () => set({ access: false }),
      name: "guest",
      changeName: (newName) => set({ name: newName }),
    }),
    {
      name: "dashboard-access",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
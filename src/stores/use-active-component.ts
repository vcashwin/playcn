import { create } from "zustand";

type ActiveComponentStore = {
  activeComponentName: string | null;
  setActiveComponentName: (name: string | null) => void;
};

export const useActiveComponent = create<ActiveComponentStore>((set) => ({
  activeComponentName: null,
  setActiveComponentName: (name) => set({ activeComponentName: name }),
}));

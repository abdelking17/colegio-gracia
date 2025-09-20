import { create } from "zustand";

export type AvatarActionState =
  | "Idle"
  | "Talk"
  | "Thinking"
  | "Wave"
  | "Greet"
  | "Point";

interface AvatarState {
  currentAction: AvatarActionState;
  setAction: (action: AvatarActionState) => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
  currentAction: "Idle",
  setAction: (currentAction) => set({ currentAction }),
}));

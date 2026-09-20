import { createContext, useContext } from "react";

export const SoundContext = createContext(null);

export function useSound() {
  return useContext(SoundContext);
}

import { createContext } from "react";

export const InputContext = createContext({
  state: {
    characterIndexRef: { current: 0 },
  },
  setState: () => null,
});

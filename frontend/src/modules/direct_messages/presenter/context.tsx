import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect } from "react";

type DirectMessagesContextData = {};

export const DirectMessagesContext = createContext<DirectMessagesContextData>(
  {} as DirectMessagesContextData
);

export function DirectMessagesProvider({ children }: BaseContextProps) {
  useEffect(() => {}, []);

  return (
    <DirectMessagesContext.Provider value={{}}>
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);

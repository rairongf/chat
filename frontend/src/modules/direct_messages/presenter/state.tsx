import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect } from "react";

type DirectMessagesStateContextData = {};

export const DirectMessagesStateContext =
  createContext<DirectMessagesStateContextData>(
    {} as DirectMessagesStateContextData
  );

export function DirectMessagesStateProvider({ children }: BaseContextProps) {
  useEffect(() => {}, []);

  return (
    <DirectMessagesStateContext.Provider value={{}}>
      {children}
    </DirectMessagesStateContext.Provider>
  );
}

export const useDirectMessagesState = () =>
  useContext(DirectMessagesStateContext);

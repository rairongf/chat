import { useAuth } from "@/modules/auth/context";
import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect } from "react";

type DirectMessagesContextData = {};

export const DirectMessagesContext = createContext<DirectMessagesContextData>(
  {} as DirectMessagesContextData
);

export function DirectMessagesProvider({ children }: BaseContextProps) {
  const { keepSignIn, setIsAuthenticated } = useAuth();

  async function init() {
    const didSucceed = await keepSignIn({});
    setIsAuthenticated(didSucceed);
    if (!didSucceed) return;
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DirectMessagesContext.Provider value={{}}>
      {children}
    </DirectMessagesContext.Provider>
  );
}

export const useDirectMessages = () => useContext(DirectMessagesContext);

"use client";

import { BaseContextProps, ReactUseState } from "@/modules/common";
import { createContext, useContext, useState } from "react";

type AuthStateContextData = {
  isAuthenticatedState: ReactUseState<boolean>;
};

export const AuthStateContext = createContext<AuthStateContextData>(
  {} as AuthStateContextData
);

export function AuthStateProvider({ children }: BaseContextProps) {
  const isAuthenticatedState = useState<boolean>(false);

  return (
    <AuthStateContext.Provider value={{ isAuthenticatedState }}>
      {children}
    </AuthStateContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthStateContext);

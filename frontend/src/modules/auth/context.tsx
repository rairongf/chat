"use client";

import { createContext, useContext, useEffect } from "react";
import { BaseContextProps } from "../common";
import {
  ISignInUsecase,
  ISignOutUsecase,
  useKeepSignIn,
  useSignIn,
  useSignOut,
} from "./domain/usecases";
import { login } from "./infra/repositories";
import { useAuthState } from "./state";

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: ISignInUsecase;
  signOut: ISignOutUsecase;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: BaseContextProps) {
  const {
    isAuthenticatedState: [isAuthenticated],
  } = useAuthState();
  const { keepSignIn } = useKeepSignIn();
  const { signIn } = useSignIn(login);
  const { signOut } = useSignOut();

  useEffect(() => {
    keepSignIn({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
